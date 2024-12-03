const { WebIdService } = require('@semapps/webid');
const { arrayOf } = require('@semapps/ldp');
const { MIME_TYPES } = require('@semapps/mime-types');
const CONFIG = require('../config/config');
const { anonReadPermissions } = require('../config/permissions');
const { TYPE_ACTOR, STATUS_EMAIL_VERIFIED, STATUS_MEMBERSHIP_VERIFIED } = require('../constants');

module.exports = {
  name: 'webid',
  mixins: [WebIdService],
  settings: {
    baseUrl: CONFIG.HOME_URL,
    path: '/users',
    acceptedTypes: ['pair:Person', 'foaf:Person'],
    permissions: anonReadPermissions,
    excludeFromMirror: false
  },
  actions: {
    // When a user is created, create an account with the email
    // Then remove the email so that it's not visible
    // Also send an invitation email if it's an actor
    async post(ctx) {
      let { containerUri, resource, contentType, webId } = ctx.params;

      if (!containerUri) {
        containerUri = await this.actions.getContainerUri({ webId }, { parentCtx: ctx });
      }

      // Keep track of organization URI, but don't post it with the user, otherwise the AuthorizerService will not work.
      const organizationUri = resource['pair:affiliatedBy'];
      delete resource['pair:affiliatedBy'];

      // If the user created the account himself (through auth.signup), process normally
      if (ctx.meta.isSignup) {
        resource.type = this.settings.acceptedTypes;

        const actorUri = await ctx.call('ldp.container.post', { containerUri, resource, contentType, webId });

        if (resource['pair:hasType'] === TYPE_ACTOR) {
          await this.actions.addToOrganization({ organizationUri, actorUri }, { parentCtx: ctx });
        }

        return actorUri;
      } else {
        let accountData;

        // If the user is added through the backoffice, create the account manually
        try {
          accountData = await ctx.call('auth.account.create', { email: resource['pair:e-mail'] });
          delete resource['pair:e-mail'];

          resource['pair:hasStatus'] =
            resource['pair:hasType'] === TYPE_ACTOR
              ? [STATUS_EMAIL_VERIFIED, STATUS_MEMBERSHIP_VERIFIED]
              : STATUS_EMAIL_VERIFIED;

          const actorUri = await ctx.call('ldp.container.post', { containerUri, resource, contentType });

          await ctx.call('auth.account.attachWebId', { accountUri: accountData['@id'], webId: actorUri });

          const token = await ctx.call('auth.account.generateResetPasswordToken', { webId: actorUri });

          const organization =
            resource['pair:hasType'] === TYPE_ACTOR &&
            (await this.actions.addToOrganization({ organizationUri, actorUri }, { parentCtx: ctx }));

          await ctx.call('mailer.inviteUser', { actorUri, organization, accountData, token });

          return actorUri;
        } catch (e) {
          // Delete account if resource creation failed, or it may cause problems when retrying
          if (accountData) await ctx.call('auth.account.remove', { id: accountData['@id'] });
          throw e;
        }
      }
    },
    async addToOrganization(ctx) {
      const { organizationUri, actorUri } = ctx.params;

      let organization = await ctx.call('ldp.resource.get', {
        resourceUri: organizationUri,
        accept: MIME_TYPES.JSON
      });

      organization['pair:affiliates'] = organization['pair:affiliates']
        ? [...arrayOf(organization['pair:affiliates']), actorUri]
        : actorUri;

      await ctx.call('ldp.resource.put', {
        resource: organization,
        contentType: MIME_TYPES.JSON,
        webId: 'system'
      });

      return organization;
    }
  },
  hooks: {
    after: {
      // Delete account after user is deleted
      async delete(ctx, res) {
        const account = await ctx.call('auth.account.findByWebId', { webId: res.resourceUri });
        if (account) {
          await ctx.call('auth.account.remove', { id: account['@id'] });
        }
        return res;
      }
    }
  }
};
