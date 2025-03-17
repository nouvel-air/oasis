const createSlug = require('speakingurl');
const urlJoin = require('url-join');
const { getContainerFromUri } = require('@semapps/ldp');
const { MIME_TYPES } = require('@semapps/mime-types');
const CONFIG = require('../config/config');
const departments = require('../config/departments.json');

module.exports = {
  name: 'region-tagger',
  dependencies: ['ldp'],
  actions: {
    async tag(ctx) {
      const { resourceUri, zipCodes, country } = ctx.params;
      let regionsUris = [];

      if (country === 'France') {
        for (let zipCode of zipCodes) {
          const regionName = this.getRegionNameFromZip(zipCode);
          if (regionName) {
            const regionUri = await this.getRegionUriFromName(regionName);
            regionsUris.push(regionUri);
          }
        }
        // Remove duplicates
        regionsUris = regionsUris.filter(function (item, pos, self) {
          return self.indexOf(item) === pos;
        });
      } else if (country === 'Belgique' || country === 'Suisse') {
        const regionUri = await this.getRegionUriFromName(country);
        regionsUris.push(regionUri);
      } else {
        // All other countries are part of France's DOM-TOM
        const regionUri = await this.getRegionUriFromName('DOM-TOM');
        regionsUris.push(regionUri);
      }

      if (regionsUris.length > 0) {
        // Delete hasRegion relation
        await ctx.call('triplestore.update', {
          query: `
            PREFIX cdlt: <http://virtual-assembly.org/ontologies/cdlt#>
            DELETE { ?s1 cdlt:hasRegion ?regions }
            WHERE { BIND(<${resourceUri}> AS ?s1) . ?s1 cdlt:hasRegion ?regions }
          `,
          webId: 'system'
        });
        // Delete regionOf inverse relation
        await ctx.call('triplestore.update', {
          query: `
            PREFIX cdlt: <http://virtual-assembly.org/ontologies/cdlt#>
            DELETE { ?regions cdlt:regionOf ?p1 }
            WHERE { BIND(<${resourceUri}> AS ?p1) . ?regions cdlt:regionOf ?p1  }
          `,
          webId: 'system'
        });

        // Insert hasRegion relation
        await ctx.call('triplestore.update', {
          query: `
            PREFIX cdlt: <http://virtual-assembly.org/ontologies/cdlt#>
            INSERT { ?s1 cdlt:hasRegion ${regionsUris.map(uri => `<${uri}>`).join(', ')} }
            WHERE { BIND(<${resourceUri}> AS ?s1) }
          `,
          webId: 'system'
        });
        // Insert regionOf inverse relation
        await ctx.call('triplestore.update', {
          query: `
            PREFIX cdlt: <http://virtual-assembly.org/ontologies/cdlt#>
            INSERT { ${regionsUris.map(uri => `<${uri}> cdlt:regionOf ?p1`).join(' . ')} }
            WHERE { BIND(<${resourceUri}> AS ?p1) }
          `,
          webId: 'system'
        });
      }
    }
  },
  methods: {
    async tagPlace(placeUri, place) {
      if (place['pair:hasPostalAddress']) {
        await this.actions.tag({
          resourceUri: placeUri,
          zipCodes: [place['pair:hasPostalAddress']['pair:addressZipCode']],
          country: place['pair:hasPostalAddress']['pair:addressCountry']
        });
      }
    },
    async tagOfferAndNeed(offerAndNeedUri, offerAndNeed) {
      if (offerAndNeed['pair:hasPostalAddress']) {
        await this.actions.tag({
          resourceUri: offerAndNeedUri,
          zipCodes: [offerAndNeed['pair:hasPostalAddress']['pair:addressZipCode']],
          country: offerAndNeed['pair:hasPostalAddress']['pair:addressCountry']
        });
      }
    },
    getRegionNameFromZip(zip) {
      if (zip) {
        const departmentNumber = zip.toString().slice(0, 2);
        const department = departments.find(d => d.num_dep.toString() === departmentNumber);
        if (department) return department.region_name;
      }
    },
    async getRegionUriFromName(regionName) {
      const regionSlug = createSlug(regionName, { lang: 'fr', custom: { '.': '.' } });
      const regionUri = urlJoin(CONFIG.HOME_URL, 'regions', regionSlug);

      // Create region if it doesn't exist yet
      const regionExists = await this.broker.call('ldp.resource.exist', { resourceUri: regionUri });
      if (!regionExists) {
        await this.broker.call('ldp.container.post', {
          resource: {
            '@context': {
              '@vocab': 'http://virtual-assembly.org/ontologies/pair#'
            },
            '@type': 'Place',
            label: regionName
          },
          containerUri: urlJoin(CONFIG.HOME_URL, 'regions'),
          slug: regionSlug,
          contentType: MIME_TYPES.JSON,
          webId: 'system'
        });
      }

      return regionUri;
    }
  },
  events: {
    async 'ldp.resource.created'(ctx) {
      const { resourceUri, newData } = ctx.params;

      switch (getContainerFromUri(resourceUri)) {
        case CONFIG.HOME_URL + 'places':
          await this.tagPlace(resourceUri, newData);
          break;
        case CONFIG.HOME_URL + 'offers-and-needs':
          await this.tagOfferAndNeed(resourceUri, newData);
          break;
      }
    },
    async 'ldp.resource.updated'(ctx) {
      const { resourceUri, newData } = ctx.params;

      switch (getContainerFromUri(resourceUri)) {
        case CONFIG.HOME_URL + 'places':
          await this.tagPlace(resourceUri, newData);
          break;
        case CONFIG.HOME_URL + 'offers-and-needs':
          await this.tagOfferAndNeed(resourceUri, newData);
          break;
      }
    }
  }
};
