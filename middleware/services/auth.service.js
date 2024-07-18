const path = require('path');
const crypto = require('crypto');
const urlJoin = require('url-join');
const { namedNode, triple } = require('@rdfjs/data-model');
const { AuthLocalService } = require('@semapps/auth');
const { MIME_TYPES } = require('@semapps/mime-types');
const CONFIG = require('../config/config');
const { arrayOf } = require('@semapps/ldp');
const {
  STATUS_EMAIL_VERIFIED,
  STATUS_EMAIL_NOT_VERIFIED,
  STATUS_MEMBERSHIP_VERIFIED,
  STATUS_MEMBERSHIP_NOT_VERIFIED,
  TYPE_AGENT,
  TYPE_ACTOR
} = require('../constants');

module.exports = {
  mixins: [AuthLocalService],
  settings: {
    baseUrl: CONFIG.HOME_URL,
    jwtPath: path.resolve(__dirname, '../jwt'),
    accountsDataset: CONFIG.AUTH_ACCOUNTS_DATASET_NAME,
    // TODO handle redirect to frontoffice when necessary
    // (Alllow to pass front URL on requests, and verify it is allowed)
    formUrl: CONFIG.BACKOFFICE_URL ? urlJoin(CONFIG.BACKOFFICE_URL, 'login') : undefined,
    mail: {
      from: `${CONFIG.FROM_NAME} <${CONFIG.FROM_EMAIL}>`,
      transport: {
        host: CONFIG.SMTP_HOST,
        port: CONFIG.SMTP_PORT,
        secure: CONFIG.SMTP_SECURE,
        auth: {
          user: CONFIG.SMTP_USER,
          pass: CONFIG.SMTP_PASS
        }
      },
      defaults: {
        locale: 'fr',
        // TODO handle redirect to frontoffice when necessary
        frontUrl: CONFIG.BACKOFFICE_URL
      }
    }
  },
  async started() {
    await this.broker.call('api.addRoute', {
      route: {
        path: '/auth/verify_email',
        name: 'auth-verify-email',
        aliases: {
          'GET /': 'auth.verifyEmail'
        }
      }
    });
    await this.broker.call('api.addRoute', {
      route: {
        path: '/auth/verify_membership',
        name: 'auth-verify-membership',
        aliases: {
          'GET /': 'auth.verifyMembership'
        }
      }
    });
  },
  actions: {
    async verifyEmail(ctx) {
      const { webId, email, token } = ctx.params;

      const actor = await ctx.call(`webid.get`, { resourceUri: webId, webId });

      if (arrayOf(actor['pair:hasStatus']).includes(STATUS_EMAIL_NOT_VERIFIED)) {
        const account = await ctx.call('auth.account.findByWebId', { webId });

        if (account.emailVerificationToken !== token || account.email !== email) {
          return 'Token ou adresse mail invalide';
        } else {
          await ctx.call('ldp.resource.patch', {
            resourceUri: webId,
            triplesToAdd: [
              triple(
                namedNode(webId),
                namedNode('http://virtual-assembly.org/ontologies/pair#hasStatus'),
                namedNode(STATUS_EMAIL_VERIFIED)
              )
            ],
            triplesToRemove: [
              triple(
                namedNode(webId),
                namedNode('http://virtual-assembly.org/ontologies/pair#hasStatus'),
                namedNode(STATUS_EMAIL_NOT_VERIFIED)
              )
            ],
            webId
          });

          // If the membership has already been validated or if the user is an agent, send activation email
          if (
            arrayOf(actor['pair:hasStatus']).includes(STATUS_MEMBERSHIP_VERIFIED) ||
            arrayOf(actor['pair:hasType']).includes(TYPE_AGENT)
          ) {
            await ctx.call('mailer.accountActivated', { webId });

            ctx.meta.$statusCode = 302;
            ctx.meta.$location = urlJoin(CONFIG.BACKOFFICE_URL, 'login');
          }
        }
      }

      return 'Votre adresse mail est bien vérifiée. Veuillez attendre la validation de votre compte par mail.';
    },
    async verifyMembership(ctx) {
      const { webId, token } = ctx.params;

      const actor = await ctx.call(`webid.get`, { resourceUri: webId, webId });

      if (arrayOf(actor['pair:hasStatus']).includes(STATUS_MEMBERSHIP_NOT_VERIFIED)) {
        const account = await ctx.call('auth.account.findByWebId', { webId });

        if (account.membershipVerificationToken !== token) {
          return 'Token invalide';
        } else {
          await ctx.call('ldp.resource.patch', {
            resourceUri: webId,
            triplesToAdd: [
              triple(
                namedNode(webId),
                namedNode('http://virtual-assembly.org/ontologies/pair#hasStatus'),
                namedNode(STATUS_MEMBERSHIP_VERIFIED)
              )
            ],
            triplesToRemove: [
              triple(
                namedNode(webId),
                namedNode('http://virtual-assembly.org/ontologies/pair#hasStatus'),
                namedNode(STATUS_MEMBERSHIP_NOT_VERIFIED)
              )
            ],
            webId
          });

          if (arrayOf(actor['pair:hasStatus']).includes(STATUS_EMAIL_VERIFIED)) {
            await ctx.call('mailer.accountActivated', { webId });
          }
        }
      }

      return 'Le compte a bien été validé';
    },
    async generateEmailVerificationToken(ctx) {
      const { webId } = ctx.params;
      const emailVerificationToken = await this.generateToken();
      const account = await ctx.call('auth.account.findByWebId', { webId });

      await ctx.call('auth.account.update', {
        id: account['@id'],
        emailVerificationToken
      });

      return emailVerificationToken;
    },
    async generateMembershipVerificationToken(ctx) {
      const { webId } = ctx.params;
      const membershipVerificationToken = await this.generateToken();
      const account = await ctx.call('auth.account.findByWebId', { webId });

      await ctx.call('auth.account.update', {
        id: account['@id'],
        membershipVerificationToken
      });

      return membershipVerificationToken;
    }
  },
  methods: {
    // Copied from the auth.account service
    async generateToken() {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(32, (ex, buf) => {
          if (ex) {
            reject(ex);
          }
          resolve(buf.toString('hex'));
        });
      });
    }
  },
  hooks: {
    after: {
      async signup(ctx, res) {
        const { webId } = res;

        const actor = await ctx.call('ldp.resource.get', {
          resourceUri: webId,
          accept: MIME_TYPES.JSON
        });

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

        await ctx.call('mailer.verifyEmail', { webId, emailVerificationToken });

        if (arrayOf(actor['pair:hasType']).includes(TYPE_ACTOR)) {
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

          await ctx.call('mailer.verifyMembership', { webId, membershipVerificationToken });
        }

        return res;
      }
    }
  }
};
