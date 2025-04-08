const CronJobMixin = require('moleculer-cronjob');
const { namedNode, triple } = require('@rdfjs/data-model');
const { STATUS_EXPIRED, STATUS_PUBLISHED } = require('../constants');

module.exports = {
  name: 'expiration',
  mixins: [CronJobMixin],
  settings: {
    cronTime: '*/2 * * * * *'
  },
  methods: {
    async onTick() {
      this.logger.info(`Checking for expired offers or needs...`);

      const results = await this.broker.call('triplestore.query', {
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
        await this.broker.call('offers-and-needs.patch', {
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
        this.broker.emit('expiration.expired', { resourceUri });
      }
    }
  }
};
