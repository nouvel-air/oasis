const { MIME_TYPES } = require('@semapps/mime-types');

/**
 * Mixin to be added to the ControlledContainerMixin
 *
 * If it detects that a protected property (predicate), defined in the settings,
 * has been removed with the PUT method, it will add it back (without throwing an error)
 *
 * This is useful if some predicates are added in the background, and you don't want
 * them to be deleted accidentally when the user edits the resource with the PUT method
 */
const ProtectedPropertiesMixin = {
  settings: {
    protectedProperties: []
  },
  hooks: {
    before: {
      async put(ctx) {
        const { resource: newData } = ctx.params;
        const resourceUri = newData.id || newData['@id'];

        const oldData = await ctx.call('ldp.resource.get', {
          resourceUri,
          accept: MIME_TYPES.JSON,
          webId: 'system'
        });

        for (const property of this.settings.protectedProperties) {
          if (oldData[property] && !newData[property]) {
            this.logger.warn(`Property ${property} cannot be removed, restoring previous value (${oldData[property]})`);
            ctx.params.resource[property] = oldData[property];
          }
        }
      }
    }
  }
};

module.exports = ProtectedPropertiesMixin;
