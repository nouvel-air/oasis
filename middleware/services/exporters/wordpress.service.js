const urlJoin = require('url-join');
const { namedNode, triple } = require('@rdfjs/data-model');
const { hasType, getParentContainerUri, arrayOf } = require('@semapps/ldp');
const { MIME_TYPES } = require('@semapps/mime-types');
const ExporterMixin = require('./exporter.mixin');
const { STATUS_PUBLISHED } = require('../../constants');
const CONFIG = require('../../config/config');
const { categoriesMapping, tagsMapping, regionsMapping } = require('../../mappings');
const departments = require('../../config/departments.json');

const transformDate = isoDate =>
  new Date(isoDate).toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }).substring(0, 10);

const getDepartmentFromZipCode = zip => {
  if (zip) {
    const departmentNumber = zip.slice(0, 2);
    const department = departments.find(d => d.num_dep.toString() === departmentNumber);
    if (department) return department.dep_name;
  }
};

const mapUrlToWordpressId = (uri, mapping) => {
  if (uri) {
    const containerUri = getParentContainerUri(uri);
    return parseInt(Object.keys(mapping).find(id => urlJoin(containerUri, mapping[id]) === uri));
  }
};

module.exports = {
  name: 'wordpress',
  mixins: [ExporterMixin],
  settings: {
    remoteApi: {
      baseUrl: CONFIG.WORDPRESS_API_BASE,
      user: CONFIG.WORDPRESS_API_USER,
      password: CONFIG.WORDPRESS_API_PASSWORD
    }
  },
  actions: {
    async clearAll() {
      const posts = await this.list(this.settings.remoteApi.baseUrl);
      for (const post of posts) {
        await this.delete(`${this.settings.remoteApi.baseUrl}/${post.id}`);
      }
    }
  },
  methods: {
    async transform(data) {
      const isHostingService = hasType(data, 'cdlt:HostingService');
      const isEvent = hasType(data, 'pair:Event');

      const organization = await this.broker.call('ldp.resource.get', {
        resourceUri: data['pair:offeredBy'],
        accept: MIME_TYPES.JSON,
        webId: 'system'
      });

      const publicationStatus = isHostingService
        ? organization['cdlt:hasPublicationStatus']
        : data['cdlt:hasPublicationStatus'];

      // Only publish to Wordpress if it has the published status
      if (publicationStatus !== STATUS_PUBLISHED) return false;

      const postalAddress = isHostingService ? organization['pair:hasPostalAddress'] : data['pair:hasPostalAddress'];

      const content = isHostingService
        ? `${data['pair:description']}\n\nCapacité: ${data['cdlt:capacity']}\nPrix: ${data['cdlt:price']}`
        : data['pair:description'];

      const region = isHostingService
        ? mapUrlToWordpressId(organization['cdlt:hasRegion'], regionsMapping)
        : mapUrlToWordpressId(data['cdlt:hasRegion'], regionsMapping);

      return {
        title: data['pair:label'],
        status: 'publish',
        'annonce-categorie': isHostingService
          ? [121]
          : data['pair:hasType']
          ? [mapUrlToWordpressId(data['pair:hasType'], categoriesMapping)]
          : [],
        'annonce-etiquette': data['cdlt:hasSubType'] ? [mapUrlToWordpressId(data['cdlt:hasSubType'], tagsMapping)] : [],
        region: region ? [region] : [],
        acf: {
          contenu: content,
          nom_du_lieu: isHostingService ? organization['pair:label'] : postalAddress?.['pair:label'],
          adresse: postalAddress?.['pair:addressStreet'],
          code_postal:
            postalAddress?.['pair:addressZipCode'] && postalAddress?.['pair:addressZipCode'].length === 5
              ? postalAddress?.['pair:addressZipCode']
              : undefined,
          ville: postalAddress?.['pair:addressLocality'],
          departement: getDepartmentFromZipCode(postalAddress?.['pair:addressZipCode']),
          latitude: postalAddress ? `${postalAddress['pair:latitude']}` : undefined,
          longitude: postalAddress ? `${postalAddress['pair:longitude']}` : undefined,
          latitude_longitude: postalAddress
            ? `${postalAddress['pair:latitude']}, ${postalAddress['pair:longitude']}`
            : undefined,
          propose_par: organization['pair:label'],
          lien: isHostingService ? data['cdlt:registrationLink'] : data['pair:homePage'],
          image_principale: arrayOf(data['pair:depictedBy'])[0], // First image
          mail: isHostingService ? organization['pair:e-mail'] : data['pair:e-mail'],
          telephone: data['pair:phone'],
          date_expiration: isHostingService ? undefined : transformDate(data['pair:endDate']),
          date_debut: isEvent ? transformDate(data['pair:startDate']) : undefined,
          date_fin: isEvent ? transformDate(data['pair:endDate']) : undefined
        },
        yoast_meta: {
          yoast_wpseo_metadesc: content.length > 140 ? `${content.substring(0, 137)}...` : content
        }
      };
    },
    async create(resourceUri, transformedData) {
      this.logger.info(`Creating new post on Wordpress for ${resourceUri}...`);

      const result = await this.fetchApi(this.settings.remoteApi.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transformedData)
      });

      const remoteUrl = `${this.settings.remoteApi.baseUrl}/${result.id}`;

      await this.broker.call('ldp.resource.patch', {
        resourceUri: resourceUri,
        triplesToAdd: [
          triple(
            namedNode(resourceUri),
            namedNode('http://virtual-assembly.org/ontologies/cdlt#exportedTo'),
            namedNode(remoteUrl)
          )
        ],
        webId: 'system'
      });

      return remoteUrl;
    },
    async update(remoteUrl, transformedData) {
      this.logger.info(`Updating Wordpress post ${remoteUrl}...`);
      await this.fetchApi(remoteUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transformedData)
      });
    },
    async delete(remoteUrl) {
      this.logger.info(`Deleting Wordpress post ${remoteUrl}...`);
      await this.fetchApi(remoteUrl, {
        method: 'DELETE'
      });
    },
    async list(remoteUrl) {
      return await this.fetchApi(remoteUrl);
    }
  }
};
