const { ControlledContainerMixin } = require('@semapps/ldp');
const { anonReadPermissions, writePermissionToActors } = require('../../config/permissions');
const { TYPE_AGENT, TYPE_IMMOBILIER, STATUS_PUBLISHED, STATUS_MODERATED } = require('../../constants');
const ProtectedPropertiesMixin = require('../../mixins/protected-properties');

module.exports = {
  name: 'offers-and-needs',
  mixins: [ControlledContainerMixin, ProtectedPropertiesMixin],
  settings: {
    path: '/offers-and-needs',
    acceptedTypes: ['cdlt:OfferAndNeed', 'pair:Event'],
    permissions: {
      ...anonReadPermissions,
      ...writePermissionToActors
    },
    protectedProperties: ['cdlt:exportedTo']
  },
  hooks: {
    before: {
      async post(ctx) {
        const webId = ctx.meta.webId;
        const actor = await ctx.call(`webid.get`, { resourceUri: webId, webId });

        if (actor['pair:hasType'] === TYPE_AGENT) {
          ctx.params.resource['cdlt:hasPublicationStatus'] = STATUS_MODERATED;
          ctx.params.resource['pair:hasType'] = TYPE_IMMOBILIER;
        } else {
          ctx.params.resource['cdlt:hasPublicationStatus'] = STATUS_PUBLISHED;
        }
      },
      async put(ctx) {
        const oldResource = await this.actions.get(
          {
            resourceUri: ctx.params.resource['@id'] || ctx.params.resource.id,
            webId: 'system'
          },
          { parentCtx: ctx }
        );

        // If the resource is being published
        if (
          oldResource['cdlt:hasPublicationStatus'] === STATUS_MODERATED &&
          ctx.params.resource['cdlt:hasPublicationStatus'] === STATUS_PUBLISHED
        ) {
          await ctx.call('mailer.offerAndNeedValidated', {
            webId: ctx.params.resource['dc:creator'],
            resource: ctx.params.resource
          });
        }
      }
    },
    after: {
      async post(ctx, res) {
        const webId = ctx.meta.webId;
        if (ctx.params.resource['cdlt:hasPublicationStatus'] === STATUS_MODERATED) {
          await ctx.call('mailer.moderateOfferAndNeed', { webId, resourceUri: res });
        }
        return res;
      }
    }
  }
};
