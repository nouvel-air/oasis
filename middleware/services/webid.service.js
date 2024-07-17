const urlJoin = require('url-join');
const { WebIdService } = require('@semapps/webid');
const { defaultToArray } = require('@semapps/ldp');
const { ACTOR_TYPES } = require('@semapps/activitypub');
const { MIME_TYPES } = require('@semapps/mime-types');
const CONFIG = require('../config/config');
const { anonReadPermissions } = require('../config/permissions');
const { STATUS_EMAIL_NOT_VERIFIED, STATUS_MEMBERSHIP_NOT_VERIFIED, TYPE_ACTOR } = require('../constants');

module.exports = {
  name: 'webid',
  mixins: [WebIdService],
  settings: {
    baseUrl: CONFIG.HOME_URL,
    path: '/users',
    acceptedTypes: ['pair:Person', 'foaf:Person', ACTOR_TYPES.PERSON],
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

      // If the user created the account himself (through auth.signup), process it normally
      if (ctx.meta.isSignup) {
        const webId = await ctx.call('ldp.container.post', { containerUri, resource, contentType, webId });

        const emailVerificationToken = await ctx.call('auth.generateEmailVerificationToken', { webId });

        await ctx.call('ldp.resource.patch', {
          resourceUri: webId,
          triplesToAdd: [
            triple(
              namedNode(webId),
              namedNode('http://virtual-assembly.org/ontologies/pair#hasStatus'),
              namedNode(STATUS_EMAIL_NOT_VERIFIED)
            )
          ],
          webId
        });

        await ctx.call('mailer.confirmEmail', { webId, emailVerificationToken });

        if (arrayOf(resource['pair:hasType']).includes(TYPE_ACTOR)) {
          const membershipVerificationToken = await ctx.call('auth.generateMembershipVerificationToken', { webId });

          await ctx.call('ldp.resource.patch', {
            resourceUri: webId,
            triplesToAdd: [
              triple(
                namedNode(webId),
                namedNode('http://virtual-assembly.org/ontologies/pair#hasStatus'),
                namedNode(STATUS_MEMBERSHIP_NOT_VERIFIED)
              )
            ],
            webId
          });

          await ctx.call('mailer.confirmMembership', { webId, membershipVerificationToken });
        }

        return actorUri;
      }

      const accountData = await ctx.call('auth.account.create', { email: resource['pair:e-mail'] });
      delete resource['pair:e-mail'];

      // Keep track of place URI, but don't post it with the user, otherwise the AuthorizerService will not work.
      const placeUri = resource['cdlt:proposes'];
      delete resource['cdlt:proposes'];

      try {
        const actorUri = await ctx.call('ldp.container.post', { containerUri, resource, contentType });

        await ctx.call('auth.account.attachWebId', { accountUri: accountData['@id'], webId: actorUri });

        const token = await ctx.call('auth.account.generateResetPasswordToken', { webId: actorUri });

        if (resource['pair:hasType'] === urlJoin(CONFIG.HOME_URL, 'types', 'actor')) {
          let place = await ctx.call('ldp.resource.get', {
            resourceUri: placeUri,
            accept: MIME_TYPES.JSON
          });

          place['cdlt:proposedBy'] = place['cdlt:proposedBy']
            ? [...defaultToArray(place['cdlt:proposedBy']), actorUri]
            : actorUri;

          await ctx.call('ldp.resource.put', {
            resource: place,
            contentType: MIME_TYPES.JSON,
            webId: 'system'
          });

          await ctx.call('mailer.inviteActor', { actorUri, place, accountData, token });
        } else if (resource['pair:hasType'] === urlJoin(CONFIG.HOME_URL, 'types', 'admin')) {
          await ctx.call('mailer.inviteAdmin', { actorUri, accountData, token });
        } else {
          throw new Error('Unknown person type: ' + resource['pair:hasType']);
        }
        return actorUri;
      } catch (e) {
        // Delete account if resource creation failed, or it may cause problems when retrying
        await ctx.call('auth.account.remove', { id: accountData['@id'] });
        throw e;
      }
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
