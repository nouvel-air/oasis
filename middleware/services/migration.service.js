const CONFIG = require('../config/config');

module.exports = {
  name: 'migration',
  actions: {
    async removeAnyUserRights(ctx) {
      const containersUris = await ctx.call('ldp.container.getUris', { containerUri: CONFIG.HOME_URL })
      for (let containerUri of containersUris) {
        const resourcesUris = await ctx.call('ldp.container.getUris', { containerUri });
        for (let resourceUri of resourcesUris) { 
          this.logger.info(`Removing anyUser rights on resource ${resourceUri}`)
          await ctx.call('webacl.resource.removeRights', {
            resourceUri,
            rights: {
              anyUser: {
                read: true,
                write: true,
              }
            },
            webId: 'system',
          });
        }
      }
    }
  }
};