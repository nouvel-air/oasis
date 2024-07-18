const path = require('path');
const urlJoin = require('url-join');
const MailerService = require('moleculer-mail');
const { MIME_TYPES } = require('@semapps/mime-types');
const { getSlugFromUri, arrayOf } = require('@semapps/ldp');
const CONFIG = require('../config/config');
const { STATUS_MEMBERSHIP_VERIFIED } = require('../constants');

module.exports = {
  name: 'mailer',
  mixins: [MailerService],
  settings: {
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
    templateFolder: path.join(__dirname, '../templates')
  },
  dependencies: ['api'],
  async started() {
    // Wait a bit before adding the route, or sometimes it is not added
    await new Promise(resolve => setTimeout(resolve, 3000));

    await this.broker.call('api.addRoute', {
      route: {
        bodyParsers: { json: true },
        aliases: {
          [`POST _mailer/contact`]: 'mailer.contact'
        }
      }
    });
  },
  actions: {
    async contact(ctx) {
      const { resourceUri, name, email, content } = ctx.params;
      let resourceLabel, resourceFrontUrl, to;

      if (!resourceUri || !name || !email || !content) throw new Error('Un ou plusieurs paramètres sont manquants');

      const resource = await ctx.call('ldp.resource.get', {
        resourceUri,
        accept: MIME_TYPES.JSON,
        webId: 'system'
      });

      const types = Array.isArray(resource.type) ? resource.type : [resource.type];

      if (types.includes('pair:Place')) {
        resourceLabel = resource['pair:label'];
        resourceFrontUrl = urlJoin(CONFIG.FRONTOFFICE_URL, 'lieux', getSlugFromUri(resourceUri));
        to = resource['pair:e-mail'];
      } else {
        throw new Error('Impossible de contacter ce type de ressource: ' + resource.type);
      }

      if (!to) throw new Error('Aucune adresse mail définie pour ' + resourceLabel + '!');

      await ctx.call('mailer.send', {
        to: [resource['pair:e-mail']],
        replyTo: `${name} <${email}>`,
        template: 'contact',
        data: {
          resourceLabel,
          resourceFrontUrl,
          name,
          email,
          content,
          contentWithBr: content.replace(/\r\n|\r|\n/g, '<br />')
        }
      });
    },
    async inviteActor(ctx) {
      let { actorUri, place, accountData, token } = ctx.params;

      const actor = await ctx.call('ldp.resource.get', {
        resourceUri: actorUri,
        accept: MIME_TYPES.JSON
      });

      const redirectUrl = urlJoin(CONFIG.BACKOFFICE_URL, 'Place', encodeURIComponent(place.id));

      await ctx.call('mailer.send', {
        to: accountData.email,
        replyTo: this.settings.from,
        template: 'invite-actor',
        data: {
          actor,
          place,
          account: accountData,
          resetUrl:
            urlJoin(CONFIG.BACKOFFICE_URL, 'login') +
            '?new_password=true&token=' +
            token +
            '&email=' +
            encodeURIComponent(accountData.email) +
            '&redirect=' +
            encodeURIComponent(redirectUrl)
        }
      });
    },
    async inviteAdmin(ctx) {
      let { actorUri, accountData, token } = ctx.params;

      const actor = await ctx.call('ldp.resource.get', {
        resourceUri: actorUri,
        accept: MIME_TYPES.JSON
      });

      const redirectUrl = urlJoin(CONFIG.BACKOFFICE_URL, 'Person', encodeURIComponent(actor.id));

      await ctx.call('mailer.send', {
        to: accountData.email,
        replyTo: this.settings.from,
        template: 'invite-admin',
        data: {
          actor,
          account: accountData,
          resetUrl:
            urlJoin(CONFIG.BACKOFFICE_URL, 'login') +
            '?new_password=true&token=' +
            token +
            '&email=' +
            encodeURIComponent(accountData.email) +
            '&redirect=' +
            encodeURIComponent(redirectUrl)
        }
      });
    },
    async verifyEmail(ctx) {
      const { webId, emailVerificationToken } = ctx.params;

      const actor = await ctx.call('ldp.resource.get', {
        resourceUri: webId,
        accept: MIME_TYPES.JSON
      });

      const account = await ctx.call('auth.account.findByWebId', { webId });

      const verifyUrl = new URL(urlJoin(CONFIG.HOME_URL, 'auth', 'verify_email'));
      verifyUrl.searchParams.append('webId', webId);
      verifyUrl.searchParams.append('email', account.email);
      verifyUrl.searchParams.append('token', emailVerificationToken);

      await ctx.call('mailer.send', {
        to: account.email,
        replyTo: this.settings.from,
        template: 'verify-email',
        data: {
          actor,
          account,
          verifyUrl: verifyUrl.toString()
        }
      });
    },
    async verifyMembership(ctx) {
      const { webId, membershipVerificationToken } = ctx.params;
      let emails = [];

      const actor = await ctx.call('ldp.resource.get', {
        resourceUri: webId,
        accept: MIME_TYPES.JSON
      });

      if (!actor['pair:affiliatedBy']) {
        this.logger.warn(`Actor ${webId} is not affiliated with any organization, skipping...`);
        return;
      }

      const organization = await ctx.call('ldp.resource.get', {
        resourceUri: actor['pair:affiliatedBy'],
        accept: MIME_TYPES.JSON
      });

      // Add organization email
      if (organization['pair:e-mail']) emails.push(organization['pair:e-mail']);

      // Add the email of other existing members
      for (const memberUri of arrayOf(organization['pair:affiliates'])) {
        if (memberUri !== webId) {
          const member = await ctx.call('ldp.resource.get', {
            resourceUri: memberUri,
            accept: MIME_TYPES.JSON,
            webId: 'system'
          });

          // Ensure the member is verified
          if (arrayOf(member['pair:hasStatus']).includes(STATUS_MEMBERSHIP_VERIFIED)) {
            const account = await ctx.call('auth.account.findByWebId', { webId: memberUri });
            if (account) emails.push(account.email);
          }
        }
      }

      const verifyUrl = new URL(urlJoin(CONFIG.HOME_URL, 'auth', 'verify_membership'));
      verifyUrl.searchParams.append('webId', webId);
      verifyUrl.searchParams.append('token', membershipVerificationToken);

      await ctx.call('mailer.send', {
        to: emails,
        replyTo: this.settings.from,
        template: 'verify-membership',
        data: {
          actor,
          organization,
          verifyUrl: verifyUrl.toString()
        }
      });
    },
    async accountActivated(ctx) {
      const { webId } = ctx.params;

      const actor = await ctx.call('ldp.resource.get', {
        resourceUri: webId,
        accept: MIME_TYPES.JSON
      });

      const account = await ctx.call('auth.account.findByWebId', { webId });

      await ctx.call('mailer.send', {
        to: account.email,
        replyTo: this.settings.from,
        template: 'account-activated',
        data: {
          actor,
          backofficeUrl: CONFIG.BACKOFFICE_URL
        }
      });
    }
  }
};
