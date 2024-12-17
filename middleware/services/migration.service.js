const urlJoin = require('url-join');
const { MigrationService } = require('@semapps/migration');
const { MIME_TYPES } = require('@semapps/mime-types');
const { namedNode, triple } = require('@rdfjs/data-model');
const CONFIG = require('../config/config');
const {
  GROUP_OASIS,
  TYPE_ACTOR,
  STATUS_EMAIL_VERIFIED,
  STATUS_MEMBERSHIP_VERIFIED,
  STATUS_PUBLISHED,
  STATUS_DRAFT
} = require('../constants');

module.exports = {
  name: 'migration',
  mixins: [MigrationService],
  settings: {
    baseUrl: CONFIG.HOME_URL
  },
  actions: {
    async migratePublishedStatus(ctx) {
      await ctx.call('triplestore.update', {
        query: `
          DELETE { ?s <https://data.lescheminsdelatransition.org/publication-status/valide> ?o . }
          INSERT { ?s <${STATUS_PUBLISHED}> ?o . }
          WHERE { ?s <https://data.lescheminsdelatransition.org/publication-status/valide> ?o . }
        `,
        webId: 'system'
      });
      await ctx.call('triplestore.update', {
        query: `
          DELETE { ?s <https://data.lescheminsdelatransition.org/publication-status/en-cours> ?o . }
          INSERT { ?s <${STATUS_DRAFT}> ?o . }
          WHERE { ?s <https://data.lescheminsdelatransition.org/publication-status/en-cours> ?o . }
        `,
        webId: 'system'
      });
    },
    async addStatusToUsers(ctx) {
      const usersUris = await ctx.call('ldp.container.getUris', { containerUri: urlJoin(CONFIG.HOME_URL, 'users') });
      for (let userUri of usersUris) {
        this.logger.info(`Migrating ${userUri}...`);
        const user = await ctx.call('ldp.resource.get', {
          resourceUri: userUri,
          accept: MIME_TYPES.JSON,
          webId: 'system'
        });
        await ctx.call('ldp.resource.patch', {
          resourceUri: userUri,
          triplesToAdd: [
            triple(
              namedNode(userUri),
              namedNode('http://virtual-assembly.org/ontologies/pair#hasStatus'),
              namedNode(STATUS_EMAIL_VERIFIED)
            )
          ],
          webId: 'system'
        });
        if (user['pair:hasType'] === TYPE_ACTOR) {
          await ctx.call('ldp.resource.patch', {
            resourceUri: userUri,
            triplesToAdd: [
              triple(
                namedNode(userUri),
                namedNode('http://virtual-assembly.org/ontologies/pair#hasStatus'),
                namedNode(STATUS_MEMBERSHIP_VERIFIED)
              )
            ],
            webId: 'system'
          });
        }
      }
    },
    async addAllPlacesToGroup(ctx) {
      const placesUris = await ctx.call('ldp.container.getUris', { containerUri: urlJoin(CONFIG.HOME_URL, 'places') });
      for (let placeUri of placesUris) {
        this.logger.info(`Migrating ${placeUri}...`);
        await ctx.call('ldp.resource.patch', {
          resourceUri: placeUri,
          triplesToAdd: [
            triple(
              namedNode(placeUri),
              namedNode('http://virtual-assembly.org/ontologies/pair#partOf'),
              namedNode(GROUP_OASIS)
            )
          ],
          webId: 'system'
        });
      }
    },
    async proposesToAffiliates() {
      await this.actions.replacePredicate({
        oldPredicate: 'http://virtual-assembly.org/ontologies/cdlt#proposedBy',
        newPredicate: 'http://virtual-assembly.org/ontologies/pair#affiliates'
      });
      await this.actions.replacePredicate({
        oldPredicate: 'http://virtual-assembly.org/ontologies/cdlt#proposes',
        newPredicate: 'http://virtual-assembly.org/ontologies/pair#affiliatedBy'
      });
    },
    async removeAnyUserRights(ctx) {
      const containersUris = await ctx.call('ldp.container.getUris', { containerUri: CONFIG.HOME_URL });
      for (let containerUri of containersUris) {
        const resourcesUris = await ctx.call('ldp.container.getUris', { containerUri });
        for (let resourceUri of resourcesUris) {
          this.logger.info(`Removing anyUser rights on resource ${resourceUri}`);
          await ctx.call('webacl.resource.removeRights', {
            resourceUri,
            rights: {
              anyUser: {
                read: true,
                write: true
              }
            },
            webId: 'system'
          });
        }
      }
    }
  }
};
