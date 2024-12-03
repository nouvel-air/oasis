const CronMixin = require('moleculer-cron');
const { namedNode, triple } = require('@rdfjs/data-model');
const { STATUS_EXPIRED, STATUS_PUBLISHED } = require('../constants');

module.exports = {
  name: 'expiration',
  mixins: [CronMixin],
  settings: {
    cronJobs: [
      {
        name: 'expirationCheck',
        cronTime: '*/2 * * * *',
        onTick: async function () {
          await this.broker.call('expiration.tagExpired');
        },
        timeZone: 'Europe/Paris'
      }
    ]
  },
  actions: {
    async tagExpired(ctx) {
      this.logger.info(`Checking for expired offers or needs...`);

      const results = await ctx.call('triplestore.query', {
        query: `
          PREFIX pair: <http://virtual-assembly.org/ontologies/pair#>
          PREFIX cdlt: <http://virtual-assembly.org/ontologies/cdlt#>
          SELECT ?resourceUri
          WHERE {
              ?resourceUri pair:endDate ?expirationTime .
              ?resourceUri cdlt:hasPublicationStatus <${STATUS_PUBLISHED}> .
              FILTER(NOW() > ?expirationTime) .
          }
        `,
        webId: 'system'
      });

      for (let resourceUri of results.map(node => node.resourceUri.value)) {
        this.logger.info(`Marking ${resourceUri} as expired...`);
        await ctx.call('offers-and-needs.patch', {
          resourceUri,
          triplesToRemove: [
            triple(
              namedNode(resourceUri),
              namedNode('http://virtual-assembly.org/ontologies/cdlt#hasPublicationStatus'),
              namedNode(STATUS_PUBLISHED)
            )
          ],
          triplesToAdd: [
            triple(
              namedNode(resourceUri),
              namedNode('http://virtual-assembly.org/ontologies/cdlt#hasPublicationStatus'),
              namedNode(STATUS_EXPIRED)
            )
          ],
          webId: 'system'
        });
        ctx.emit('expiration.expired', { resourceUri });
      }
    }
  }
};
