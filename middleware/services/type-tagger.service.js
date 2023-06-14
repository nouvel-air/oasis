const { getContainerFromUri } = require('@semapps/ldp');
const CONFIG = require('../config/config');

module.exports = {
  name: 'type-tagger-tagger',
  dependencies: ['ldp'],
  actions: {
    async updatePlaceType(ctx) {
      const { placeUri } = ctx.params;

      console.log('updatePlaceType', ctx.params);

      // Delete existing types
      await ctx.call('triplestore.update', {
        query: `
          PREFIX cdlt: <http://virtual-assembly.org/ontologies/cdlt#>
          DELETE
          WHERE {
            <${placeUri}> cdlt:hasServiceType ?oldTypeUri
          }
        `,
        webId: 'system'
      });

      // Insert new types
      await ctx.call('triplestore.update', {
        query: `
          PREFIX cdlt: <http://virtual-assembly.org/ontologies/cdlt#>
          PREFIX pair: <http://virtual-assembly.org/ontologies/pair#>
          INSERT { 
            <${placeUri}> cdlt:hasServiceType ?typeUri 
          }
          WHERE {
            <${placeUri}> pair:offers ?serviceUri .
            ?serviceUri cdlt:hasServiceType ?typeUri
          }
        `,
        webId: 'system'
      });

      if (this.broker.cacher) {
        ctx.call('ldp.cache.invalidateResource', { resourceUri: placeUri });
      }
    }
  },
  events: {
    async 'ldp.resource.created'(ctx) {
      const { resourceUri, newData } = ctx.params;
      switch(getContainerFromUri(resourceUri)){
        case CONFIG.HOME_URL + 'services':
          await this.actions.updatePlaceType({ placeUri: newData['pair:offeredBy'] }, { parentCtx: ctx });
          break;
      }
    },
    async 'ldp.resource.updated'(ctx) {
      const { resourceUri, newData, oldData } = ctx.params;
      switch(getContainerFromUri(resourceUri)){
        case CONFIG.HOME_URL + 'services':
          if (newData['pair:offeredBy'] != oldData['pair:offeredBy']) {
            // If the place associated to the service changed, update both places
            await this.actions.updatePlaceType({ placeUri: oldData['pair:offeredBy'] }, { parentCtx: ctx });
            await this.actions.updatePlaceType({ placeUri: newData['pair:offeredBy'] }, { parentCtx: ctx });
          } else if (newData['cdlt:hasServiceType'] != oldData['cdlt:hasServiceType']) {
            // If the type of the service changed, update the associated place
            await this.actions.updatePlaceType({ placeUri: newData['pair:offeredBy'] }, { parentCtx: ctx });
          } 
          break;
      }
    },
    async 'ldp.resource.deleted'(ctx) {
      const { resourceUri, oldData } = ctx.params;
      switch(getContainerFromUri(resourceUri)){
        case CONFIG.HOME_URL + 'services':
          await this.actions.updatePlaceType({ placeUri: oldData['pair:offeredBy'] }, { parentCtx: ctx });
          break;
      }
    }
  }
};
