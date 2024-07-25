const urlJoin = require('url-join');
const fetch = require('node-fetch');
const { namedNode, triple } = require('@rdfjs/data-model');
const { hasType, getParentContainerUri, arrayOf } = require('@semapps/ldp');
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
        this.logger.info(`Deleting ${CONFIG.WORDPRESS_API_BASE}/${post.id}...`);
        await this.delete(`${CONFIG.WORDPRESS_API_BASE}/${post.id}`);
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
            postalAddress?.['pair:addressZipCode'].length === 5 ? postalAddress?.['pair:addressZipCode'] : undefined,
          ville: postalAddress?.['pair:addressLocality'],
          departement: getDepartmentFromZipCode(postalAddress?.['pair:addressZipCode']),
          latitude: postalAddress ? `${postalAddress['pair:latitude']}` : undefined,
          longitude: postalAddress ? `${postalAddress['pair:longitude']}` : undefined,
          propose_par: organization['pair:label'],
          lien: isHostingService ? data['cdlt:registrationLink'] : data['pair:homePage'],
          images: null,
          mail: isHostingService ? organization['pair:e-mail'] : data['pair:e-mail'],
          telephone: data['pair:phone'],
          date_expiration: isHostingService ? undefined : transformDate(data['pair:endDate']),
          date_debut: isEvent ? transformDate(data['pair:startDate']) : undefined,
          date_fin: isEvent ? transformDate(data['pair:endDate']) : undefined
        }
      };
    },
    async fetchApi(url, options = {}) {
      if (!CONFIG.WORDPRESS_API_BASE) this.logger.info('Wordpress synchronization has been disabled, skipping...');

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
        try {
          const errorMessage = await response.json();
          this.logger.warn(
            `Could not ${options.method} to Wordpress API ${url} with body ${options.body}. Error ${errorMessage.code}: ${errorMessage.message})`
          );
        } catch (e) {
          this.logger.warn(
            `Could not ${options.method} to Wordpress API ${url} with body ${options.body}. Error ${response.status}: ${response.statusText})`
          );
        }
        return false;
      }
    },
    async create(resourceUri, wordpressData) {
      this.logger.info(`Creating new post on Wordpress for ${resourceUri}...`);
      const annonce = await this.fetchApi(CONFIG.WORDPRESS_API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(wordpressData)
      });

      const wordpressUrl = `${CONFIG.WORDPRESS_API_BASE}/${annonce.id}`;

      await this.broker.call('ldp.resource.patch', {
        resourceUri: resourceUri,
        triplesToAdd: [
          triple(
            namedNode(resourceUri),
            namedNode('http://virtual-assembly.org/ontologies/cdlt#exportedTo'),
            namedNode(wordpressUrl)
          )
        ],
        webId: 'system'
      });

      return wordpressUrl;
    },
    async update(wordpressUrl, wordpressData) {
      this.logger.info(`Updating Wordpress post ${wordpressUrl}...`);
      await this.fetchApi(wordpressUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(wordpressData)
      });
    },
    async delete(wordpressUrl) {
      this.logger.info(`Deleting Wordpress post ${wordpressUrl}...`);
      await this.fetchApi(wordpressUrl, {
        method: 'DELETE'
      });
    },
    async list() {
      return await this.fetchApi(CONFIG.WORDPRESS_API_BASE);
    }
  },
  events: {
    async 'ldp.resource.created'(ctx) {
      const { resourceUri, newData } = ctx.params;
      if (hasType(newData, 'cdlt:OfferAndNeed') || hasType(newData, 'pair:Event')) {
        const resource = await ctx.call('ldp.resource.awaitCreateComplete', {
          resourceUri,
          predicates: ['cdlt:hasRegion'],
          webId: 'system'
        });
        const wordpressData = await this.transform(resource);
        if (wordpressData) {
          await this.create(resourceUri, wordpressData);
        }
      } else if (hasType(newData, 'cdlt:HostingService')) {
        // We don't need to wait for the cdlt:hasRegion predicate
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
          if (newData['cdlt:exportedTo']) {
            await this.update(newData['cdlt:exportedTo'], wordpressData);
          } else {
            await this.create(resourceUri, wordpressData);
          }
        } else {
          // If it is not published anymore, delete it and remove the link from the resource
          if (newData['cdlt:exportedTo']) {
            await this.delete(newData['cdlt:exportedTo']);
            await ctx.call('ldp.resource.patch', {
              resourceUri: resourceUri,
              triplesToRemove: [
                triple(
                  namedNode(resourceUri),
                  namedNode('http://virtual-assembly.org/ontologies/cdlt#exportedTo'),
                  namedNode(newData['cdlt:exportedTo'])
                )
              ],
              webId: 'system'
            });
          }
        }
      } else if (hasType(newData, 'pair:Place')) {
        if (newData['cdlt:hasPublicationStatus'] === STATUS_PUBLISHED) {
          // If the place is published, update or create all its services
          for (const serviceUri of arrayOf(newData['pair:offers'])) {
            const service = await ctx.call('ldp.resource.get', {
              resourceUri: serviceUri,
              accept: MIME_TYPES.JSON,
              webId: 'system'
            });
            const wordpressData = await this.transform(service);
            if (wordpressData) {
              if (service['cdlt:exportedTo']) {
                await this.update(service['cdlt:exportedTo'], wordpressData);
              } else {
                await this.create(serviceUri, wordpressData);
              }
            }
          }
        } else {
          // If the place is unpublished, unpublish all its services
          for (const serviceUri of arrayOf(newData['pair:offers'])) {
            const service = await ctx.call('ldp.resource.get', {
              resourceUri: serviceUri,
              accept: MIME_TYPES.JSON,
              webId: 'system'
            });
            if (service['cdlt:exportedTo']) {
              await this.delete(service['cdlt:exportedTo']);
              await ctx.call('ldp.resource.patch', {
                resourceUri: serviceUri,
                triplesToRemove: [
                  triple(
                    namedNode(serviceUri),
                    namedNode('http://virtual-assembly.org/ontologies/cdlt#exportedTo'),
                    namedNode(service['cdlt:exportedTo'])
                  )
                ],
                webId: 'system'
              });
            }
          }
        }
      }
    },
    async 'ldp.resource.deleted'(ctx) {
      const { oldData } = ctx.params;
      if (
        hasType(oldData, 'cdlt:OfferAndNeed') ||
        hasType(oldData, 'pair:Event') ||
        hasType(oldData, 'cdlt:HostingService')
      ) {
        if (oldData['cdlt:exportedTo']) {
          await this.delete(oldData['cdlt:exportedTo']);
        }
      } else if (hasType(oldData, 'pair:Place')) {
        for (const serviceUri of arrayOf(oldData['pair:offers'])) {
          const service = await this.broker.call('ldp.resource.get', {
            resourceUri: serviceUri,
            accept: MIME_TYPES.JSON,
            webId: 'system'
          });
          if (service['cdlt:exportedTo']) {
            await this.delete(service['cdlt:exportedTo']);
            await ctx.call('ldp.resource.patch', {
              resourceUri: serviceUri,
              triplesToRemove: [
                triple(
                  namedNode(serviceUri),
                  namedNode('http://virtual-assembly.org/ontologies/cdlt#exportedTo'),
                  namedNode(service['cdlt:exportedTo'])
                )
              ],
              webId: 'system'
            });
          }
        }
      }
    },
    async 'expiration.expired'(ctx) {
      // We could handle this through ldp.resource.patched, but it's easier with a custom event
      const { resourceUri } = ctx.params;
      const offerAndNeed = await ctx.call('ldp.resource.get', {
        resourceUri: resourceUri,
        accept: MIME_TYPES.JSON,
        webId: 'system'
      });
      if (offerAndNeed['cdlt:exportedTo']) {
        await this.delete(offerAndNeed['cdlt:exportedTo']);
      }
    }
  }
};
