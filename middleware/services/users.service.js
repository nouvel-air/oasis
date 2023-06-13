const urlJoin = require("url-join");
const { ControlledContainerMixin } = require('@semapps/ldp');
const { ACTOR_TYPES } = require("@semapps/activitypub");
const CONFIG = require("../config/config");

module.exports = {
  name: 'users',
  mixins: [ControlledContainerMixin],
  settings: {
    path: '/users',
    acceptedTypes: ['pair:Person', 'foaf:Person', ACTOR_TYPES.PERSON],
    dereference: ['sec:publicKey'],
    excludeFromMirror: false
  },
  actions: {
    // When a user is created, create an account with the email
    // Then remove the email so that it's not visible
    // Also send an invitation email if it's an actor
    async post(ctx) {
      const { containerUri, slug, resource, contentType } = ctx.params;

      const accountData = await ctx.call('auth.account.create', { email: resource['pair:e-mail'] });
      delete resource['pair:e-mail'];

      const actorUri = await ctx.call('ldp.container.post', { containerUri, slug, resource, contentType });

      await ctx.call('auth.account.attachWebId', { accountUri: accountData['@id'], webId: actorUri });

      const token = await ctx.call('auth.account.generateResetPasswordToken', { webId: actorUri });

      if (resource['pair:hasType'] === urlJoin(CONFIG.HOME_URL, 'types', 'actor')) {
        await ctx.call('mailer.inviteActor', { actorUri, accountData, token });
      } else if (resource['pair:hasType'] === urlJoin(CONFIG.HOME_URL, 'types', 'admin')) {
        await ctx.call('mailer.inviteAdmin', { actorUri, accountData, token });
      } else {
        throw new Error('Unknown person type: ' + resource['pair:hasType'])
      }

      return actorUri;
    }
  },
  hooks: {
    after: {
      // Delete account after user is deleted
      async delete(ctx, res) {
        const account = await ctx.call('auth.account.findByWebId', { webId: res.resourceUri });
        if( account ) {
          await ctx.call('auth.account.remove', { id: account['@id'] });
        }
        return res;
      }
    }
  }
};
