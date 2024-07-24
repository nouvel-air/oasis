const urlJoin = require('url-join');
const fetch = require('node-fetch');
const { namedNode, triple } = require('@rdfjs/data-model');
const { hasType, getParentContainerUri } = require('@semapps/ldp');
const { MIME_TYPES } = require('@semapps/mime-types');
const { STATUS_PUBLISHED } = require('../constants');
const CONFIG = require('../config/config');
const { categoriesMapping, tagsMapping, regionsMapping } = require('../mappings');
const departments = require('../config/departments.json');

const transformDate = isoDate => isoDate.substring(0, 10).replaceAll('-', '/');

const getDepartmentFromZipCode = zip => {
  const departmentNumber = zip.slice(0, 2);
  const department = departments.find(d => d.num_dep.toString() === departmentNumber);
  if (department) return department.dep_name;
};

const mapUrlToWordpressId = (uri, mapping) => {
  if (uri) {
    const containerUri = getParentContainerUri(uri);
    return parseInt(Object.keys(mapping).find(id => urlJoin(containerUri, mapping[id]) === uri));
  }
};

module.exports = {
  name: 'wordpress',
  actions: {
    async exportAll(ctx) {
      const offersAndNeedsUris = await ctx.call('ldp.container.getUris', {
        containerUri: urlJoin(CONFIG.HOME_URL, 'offers-and-needs')
      });
      const servicesUris = await ctx.call('ldp.container.getUris', {
        containerUri: urlJoin(CONFIG.HOME_URL, 'services')
      });
      for (const resourceUri of [...offersAndNeedsUris, ...servicesUris]) {
        this.logger.info(`Exporting ${resourceUri}...`);
        const resource = await this.broker.call('ldp.resource.get', {
          resourceUri,
          accept: MIME_TYPES.JSON,
          webId: 'system'
        });
        const wordpressData = await this.transform(resource);
        if (wordpressData) {
          const wordpressUrl = await this.create(resourceUri, wordpressData);
          this.logger.info(`Done! Wordpress URL: ${wordpressUrl}`);
        } else {
          this.logger.info('Skipped!');
        }
      }
    },
    async clearAll() {
      const posts = await this.list();
      for (const post of posts) {
        this.logger.info(`Deleting https://cooperative-oasis.org/wp-json/wp/v2/annonces/${post.id}...`);
        await this.delete(`https://cooperative-oasis.org/wp-json/wp/v2/annonces/${post.id}`);
      }
    }
  },
  methods: {
    async transform(data) {
      // Only publish
      if (data['cdlt:hasPublicationStatus'] !== STATUS_PUBLISHED) return false;

      const organization = await this.broker.call('ldp.resource.get', {
        resourceUri: data['pair:offeredBy'],
        accept: MIME_TYPES.JSON,
        webId: 'system'
      });

      return {
        title: data['pair:label'],
        status: 'publish',
        // date: '2024-07-23T11:01:00',
        'annonce-categorie': data['pair:hasType'] ? [mapUrlToWordpressId(data['pair:hasType'], categoriesMapping)] : [],
        'annonce-etiquette': data['cdlt:hasSubType'] ? [mapUrlToWordpressId(data['cdlt:hasSubType'], tagsMapping)] : [],
        region: data['cdlt:hasRegion'] ? [mapUrlToWordpressId(data['cdlt:hasRegion'], regionsMapping)] : [],
        acf: {
          contenu: data['pair:description'],
          nom_du_lieu: data['pair:hasPostalAddress']?.['pair:label'],
          adresse: data['pair:hasPostalAddress']?.['pair:addressStreet'],
          code_postal: data['pair:hasPostalAddress']?.['pair:addressZipCode'],
          ville: data['pair:hasPostalAddress']?.['pair:addressLocality'],
          departement: getDepartmentFromZipCode(data['pair:hasPostalAddress']?.['pair:addressZipCode']),
          latitude: data['pair:hasPostalAddress']?.['pair:latitude'],
          longitude: data['pair:hasPostalAddress']?.['pair:longitude'],
          propose_par: organization['pair:label'],
          lien: data['pair:homePage'],
          images: null,
          mail: data['pair:e-mail'],
          telephone: data['pair:phone'],
          date_expiration: transformDate(data['pair:endDate']),
          date_debut: hasType(data, 'pair:Event') ? transformDate(data['pair:startDate']) : undefined,
          date_fin: hasType(data, 'pair:Event') ? transformDate(data['pair:endDate']) : undefined
        }
      };
    },
    async fetchApi(url, options) {
      let headers = options.headers || {};
      headers['Authorization'] = `Basic ${Buffer.from(
        `${CONFIG.WORDPRESS_API_USER}:${CONFIG.WORDPRESS_API_PASSWORD}`
      ).toString('base64')}`;

      const response = await fetch(url, {
        ...options,
        headers
      });

      if (response.ok) {
        let returnValue;
        try {
          returnValue = await response.json();
        } catch (e) {
          returnValue = await response.text();
        }
        return returnValue;
      } else {
        this.logger.warn(
          `Could not ${options.method} to Wordpress API ${url} with body ${options.body}. Error ${response.status} (${response.statusText})`
        );
        return false;
      }
    },
    async create(resourceUri, wordpressData) {
      const wordpressId = await this.fetchApi('https://cooperative-oasis.org/wp-json/wp/v2/annonces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(wordpressData)
      });

      const wordpressUrl = `https://cooperative-oasis.org/wp-json/wp/v2/annonces/${wordpressId}`;

      await this.broker.call('ldp.resource.patch', {
        resourceUri: resourceUri,
        triplesToAdd: [
          triple(namedNode(resourceUri), namedNode('http://purl.org/dc/elements/1.1/relation'), namedNode(wordpressUrl))
        ],
        webId: 'system'
      });

      return wordpressUrl;
    },
    async update(wordpressUrl, wordpressData) {
      await this.fetchApi(wordpressUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(wordpressData)
      });
    },
    async delete(wordpressUrl) {
      await this.fetchApi(wordpressUrl, {
        method: 'DELETE'
      });
    },
    async list() {
      return await this.fetchApi('https://cooperative-oasis.org/wp-json/wp/v2/annonces');
    }
  },
  events: {
    async 'ldp.resource.created'(ctx) {
      const { resourceUri, newData } = ctx.params;
      if (
        hasType(newData, 'cdlt:OfferAndNeed') ||
        hasType(newData, 'pair:Event') ||
        hasType(newData, 'cdlt:HostingService')
      ) {
        const wordpressData = await this.transform(newData);
        if (wordpressData) {
          await this.create(resourceUri, wordpressData);
        }
      }
    },
    async 'ldp.resource.updated'(ctx) {
      const { resourceUri, newData } = ctx.params;
      if (
        hasType(newData, 'cdlt:OfferAndNeed') ||
        hasType(newData, 'pair:Event') ||
        hasType(newData, 'cdlt:HostingService')
      ) {
        const wordpressData = await this.transform(newData);
        if (wordpressData) {
          if (newData['dc:relation']) {
            await this.update(newData['dc:relation'], wordpressData);
          } else {
            await this.create(resourceUri, wordpressData);
          }
        }
      }
    },
    async 'ldp.resource.deleted'(ctx) {
      const { oldData } = ctx.params;
      if (oldData['dc:relation']) {
        await this.delete(oldData['dc:relation']);
      }
    }
  }
};
