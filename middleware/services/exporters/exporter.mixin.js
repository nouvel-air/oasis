const urlJoin = require('url-join');
const { namedNode, triple } = require('@rdfjs/data-model');
const { hasType, arrayOf } = require('@semapps/ldp');
const { MIME_TYPES } = require('@semapps/mime-types');
const { STATUS_PUBLISHED } = require('../../constants');
const CONFIG = require('../../config/config');

module.exports = {
  name: 'exporter',
  settings: {
    remoteApi: {
      baseUrl: null,
      user: null,
      password: null
    }
  },
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
        const transformedData = await this.transform(resource);
        if (transformedData) {
          const remoteUrl = await this.create(resourceUri, transformedData);
          this.logger.info(`Done! Remote URL: ${remoteUrl}`);
        } else {
          this.logger.info('Skipped!');
        }
      }
    },
    async clearAllRemoteUrls(ctx) {
      this.logger.info(`Clearing all remote URLs starting with ${this.settings.remoteApi.baseUrl}...`);
      await ctx.call('triplestore.update', {
        query: `
          DELETE {
            ?subject <http://virtual-assembly.org/ontologies/cdlt#exportedTo> ?object
          }
          WHERE {
            ?subject <http://virtual-assembly.org/ontologies/cdlt#exportedTo> ?object .
            FILTER(STRSTARTS(STR(?object), "${this.settings.remoteApi.baseUrl}"))
          }
        `,
        webId: 'system'
      });
      this.logger.info(`Clearing all Redis cache...`);
      this.broker.cacher.clean();
    }
  },
  methods: {
    async transform(data) {
      throw new Error(`The transform method must be implemented by the service`);
    },
    async create(resourceUri, transformedData) {
      throw new Error(`The create method must be implemented by the service`);
    },
    async update(remoteUrl, transformedData) {
      throw new Error(`The update method must be implemented by the service`);
    },
    async delete(remoteUrl) {
      throw new Error(`The delete method must be implemented by the service`);
    },
    async list(remoteUrl) {
      throw new Error(`The list method must be implemented by the service`);
    },
    getRemoteUrl(data) {
      return arrayOf(data['cdlt:exportedTo']).find(url => url.startsWith(this.settings.remoteApi.baseUrl));
    },
    async fetchApi(url, options = {}) {
      if (!this.settings.remoteApi.baseUrl) {
        this.logger.info(`Exporter ${this.name} has been disabled, skipping...`);
        return;
      }

      let headers = options.headers || {};
      headers['Authorization'] = `Basic ${Buffer.from(
        `${this.settings.remoteApi.user}:${this.settings.remoteApi.password}`
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
            `Could not ${options.method} to remote API ${url} with body ${options.body}. Error ${errorMessage.code}: ${errorMessage.message})`
          );
        } catch (e) {
          this.logger.warn(
            `Could not ${options.method} to remote API ${url} with body ${options.body}. Error ${response.status}: ${response.statusText})`
          );
        }
        return false;
      }
    }
  },
  events: {
    async 'ldp.resource.created'(ctx) {
      if (this.settings.remoteApi.baseUrl) {
        const { resourceUri, newData } = ctx.params;
        if (hasType(newData, 'cdlt:OfferAndNeed') || hasType(newData, 'pair:Event')) {
          const resource = await ctx.call('ldp.resource.awaitCreateComplete', {
            resourceUri,
            predicates: ['cdlt:hasRegion'],
            webId: 'system'
          });
          const transformedData = await this.transform(resource);
          if (transformedData) {
            await this.create(resourceUri, transformedData);
          }
        } else if (hasType(newData, 'cdlt:HostingService')) {
          // We don't need to wait for the cdlt:hasRegion predicate
          const transformedData = await this.transform(newData);
          if (transformedData) {
            await this.create(resourceUri, transformedData);
          }
        }
      }
    },
    async 'ldp.resource.updated'(ctx) {
      if (this.settings.remoteApi.baseUrl) {
        const { resourceUri, newData } = ctx.params;
        if (
          hasType(newData, 'cdlt:OfferAndNeed') ||
          hasType(newData, 'pair:Event') ||
          hasType(newData, 'cdlt:HostingService')
        ) {
          const transformedData = await this.transform(newData);
          const remoteUrl = this.getRemoteUrl(newData);
          if (transformedData) {
            if (remoteUrl) {
              await this.update(remoteUrl, transformedData);
            } else {
              await this.create(resourceUri, transformedData);
            }
          } else {
            // If it is not published anymore, delete it and remove the link from the resource
            if (remoteUrl) {
              await this.delete(remoteUrl);
              await ctx.call('ldp.resource.patch', {
                resourceUri: resourceUri,
                triplesToRemove: [
                  triple(
                    namedNode(resourceUri),
                    namedNode('http://virtual-assembly.org/ontologies/cdlt#exportedTo'),
                    namedNode(remoteUrl)
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
              const transformedData = await this.transform(service);
              if (transformedData) {
                const remoteUrl = this.getRemoteUrl(service);
                if (remoteUrl) {
                  await this.update(remoteUrl, transformedData);
                } else {
                  await this.create(serviceUri, transformedData);
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
              const remoteUrl = this.getRemoteUrl(service);
              if (remoteUrl) {
                await this.delete(remoteUrl);
                await ctx.call('ldp.resource.patch', {
                  resourceUri: serviceUri,
                  triplesToRemove: [
                    triple(
                      namedNode(serviceUri),
                      namedNode('http://virtual-assembly.org/ontologies/cdlt#exportedTo'),
                      namedNode(remoteUrl)
                    )
                  ],
                  webId: 'system'
                });
              }
            }
          }
        }
      }
    },
    async 'ldp.resource.deleted'(ctx) {
      if (this.settings.remoteApi.baseUrl) {
        const { oldData } = ctx.params;
        if (
          hasType(oldData, 'cdlt:OfferAndNeed') ||
          hasType(oldData, 'pair:Event') ||
          hasType(oldData, 'cdlt:HostingService')
        ) {
          const remoteUrl = this.getRemoteUrl(oldData);
          if (remoteUrl) {
            await this.delete(remoteUrl);
          }
        } else if (hasType(oldData, 'pair:Place')) {
          for (const serviceUri of arrayOf(oldData['pair:offers'])) {
            const service = await this.broker.call('ldp.resource.get', {
              resourceUri: serviceUri,
              accept: MIME_TYPES.JSON,
              webId: 'system'
            });
            const remoteUrl = this.getRemoteUrl(service);
            if (remoteUrl) {
              await this.delete(remoteUrl);
              await ctx.call('ldp.resource.patch', {
                resourceUri: serviceUri,
                triplesToRemove: [
                  triple(
                    namedNode(serviceUri),
                    namedNode('http://virtual-assembly.org/ontologies/cdlt#exportedTo'),
                    namedNode(remoteUrl)
                  )
                ],
                webId: 'system'
              });
            }
          }
        }
      }
    },
    async 'expiration.expired'(ctx) {
      if (this.settings.remoteApi.baseUrl) {
        // We could handle this through ldp.resource.patched, but it's easier with a custom event
        const { resourceUri } = ctx.params;
        const offerAndNeed = await ctx.call('ldp.resource.get', {
          resourceUri: resourceUri,
          accept: MIME_TYPES.JSON,
          webId: 'system'
        });
        const remoteUrl = this.getRemoteUrl(offerAndNeed);
        if (remoteUrl) {
          await this.delete(remoteUrl);
        }
      }
    }
  }
};
