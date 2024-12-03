const { namedNode, triple } = require('@rdfjs/data-model');
const { hasType, arrayOf } = require('@semapps/ldp');
const { MIME_TYPES } = require('@semapps/mime-types');
const ExporterMixin = require('./exporter.mixin');
const { STATUS_PUBLISHED } = require('../../constants');
const { countriesMapping } = require('../../mappings');
const CONFIG = require('../../config/config');

const transformDate = isoDate => isoDate.substring(0, 10).replaceAll('-', '/');

module.exports = {
  name: 'ecovillageglobal',
  mixins: [ExporterMixin],
  settings: {
    remoteApi: {
      baseUrl: CONFIG.ECOVILLAGEGLOBAL_API_BASE,
      user: CONFIG.ECOVILLAGEGLOBAL_API_USER,
      password: CONFIG.ECOVILLAGEGLOBAL_API_PASSWORD
    }
  },
  methods: {
    async transform(data) {
      if (!data['cdlt:publishOnEcovillageGlobal']) {
        this.logger.info(`Owner chose not to publish on ecovillage global, skipping...`);
        return false;
      }

      const isHostingService = hasType(data, 'cdlt:HostingService');
      const isEvent = hasType(data, 'pair:Event');

      const organization = await this.broker.call('ldp.resource.get', {
        resourceUri: data['pair:offeredBy'],
        accept: MIME_TYPES.JSON,
        webId: 'system'
      });

      // const creator = await this.broker.call('ldp.resource.get', {
      //   resourceUri: data['dc:creator'],
      //   accept: MIME_TYPES.JSON,
      //   webId: 'system'
      // });

      const publicationStatus = isHostingService
        ? organization['cdlt:hasPublicationStatus']
        : data['cdlt:hasPublicationStatus'];

      // Only publish to Wordpress if it has the published status
      if (publicationStatus !== STATUS_PUBLISHED) return false;

      const postalAddress = isHostingService ? organization['pair:hasPostalAddress'] : data['pair:hasPostalAddress'];

      const content = isHostingService
        ? `${data['pair:description']}\n\nCapacité: ${data['cdlt:capacity']}\nPrix: ${data['cdlt:price']}`
        : data['pair:description'];

      const categoryName = await this.getCategoryName(data);
      const subCategoryName = await this.getSubCategoryName(data);

      // https://annuel2.framapad.org/p/api_sync_evg-r0d49?lang=fr
      return {
        titre: data['pair:label'],
        texte: content,
        contact: {
          // prenom: creator['pair:firstName'],
          // nom: creator['pair:lastName'],
          structure: organization['pair:label'],
          adresse: postalAddress?.['pair:addressStreet'],
          cp:
            postalAddress?.['pair:addressZipCode'] && postalAddress?.['pair:addressZipCode'].length === 5
              ? postalAddress?.['pair:addressZipCode']
              : undefined,
          ville: postalAddress?.['pair:addressLocality'],
          pays: countriesMapping[postalAddress?.['pair:addressCountry']],
          tel: data['pair:phone'],
          email: isHostingService ? organization['pair:e-mail'] : data['pair:e-mail'],
          site: isHostingService ? data['cdlt:registrationLink'] : data['pair:homePage']
        },
        sync_ref: data.id,
        texte_court: content.length > 600 ? `${content.substring(0, 597)}...` : content,
        evenement_debut: isEvent ? transformDate(data['pair:startDate']) : undefined,
        evenement_fin: isEvent ? transformDate(data['pair:endDate']) : undefined,
        categorie: categoryName,
        themes: subCategoryName,
        documents: arrayOf(data['pair:depictedBy'])
      };
    },
    async create(resourceUri, transformedData) {
      this.logger.info(`Creating new post on Ecovillage Global for ${resourceUri}...`);

      const result = await this.fetchApi(this.settings.remoteApi.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transformedData)
      });

      if (result.ressource) {
        const remoteUrl = `${this.settings.remoteApi.baseUrl}/${result.ressource.id_annonce}`;

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
      } else if (result.erreur) {
        this.logger.error(`${result.erreur.title}: ${result.erreur.message}`);
      }
    },
    async update(remoteUrl, transformedData) {
      this.logger.info(`Updating Ecovillage Global post ${remoteUrl}...`);
      await this.fetchApi(remoteUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...transformedData, sync_ref: undefined })
      });
    },
    async delete(remoteUrl) {
      this.logger.info(`Deleting Ecovillage Global post ${remoteUrl}...`);
      await this.fetchApi(remoteUrl, {
        method: 'DELETE'
      });
    },
    async getCategoryName(data) {
      if (hasType(data, 'cdlt:HostingService')) {
        return "Offre d'hébergement";
      } else {
        const category = await this.broker.call('ldp.resource.get', {
          resourceUri: data['pair:hasType'],
          accept: MIME_TYPES.JSON,
          webId: 'system'
        });
        return category['pair:label'];
      }
    },
    async getSubCategoryName(data) {
      if (hasType(data, 'cdlt:HostingService')) {
        const category = await this.broker.call('ldp.resource.get', {
          resourceUri: data['cdlt:hasServiceType'],
          accept: MIME_TYPES.JSON,
          webId: 'system'
        });
        return category['pair:label'];
      } else if (data['cdlt:hasSubType']) {
        const category = await this.broker.call('ldp.resource.get', {
          resourceUri: data['cdlt:hasSubType'],
          accept: MIME_TYPES.JSON,
          webId: 'system'
        });
        return category['pair:label'];
      }
    }
  }
};
