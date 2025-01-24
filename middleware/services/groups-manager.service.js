const urlJoin = require('url-join');
const { arrayOf } = require('@semapps/ldp');
const { GroupsManagerBot } = require('@semapps/webacl');
const { MIME_TYPES } = require('@semapps/mime-types');
const CONFIG = require('../config/config');
const { TYPE_ADMIN, TYPE_ACTOR, TYPE_AGENT, TYPE_MEMBER } = require('../constants');

module.exports = {
  mixins: [GroupsManagerBot],
  settings: {
    usersContainer: urlJoin(CONFIG.HOME_URL, 'users'),
    rules: [
      {
        match: { 'pair:hasType': TYPE_ADMIN },
        groupSlug: 'superadmins'
      },
      {
        match: userData => [TYPE_ACTOR, TYPE_AGENT, TYPE_MEMBER].includes(userData['pair:hasType']),
        groupSlug: 'actors'
      }
    ]
  },
  actions: {
    async refreshAll(ctx) {
      const usersContainer = await ctx.call('ldp.container.get', {
        containerUri: this.settings.usersContainer,
        accept: MIME_TYPES.JSON,
        webId: 'system'
      });

      for (const user of arrayOf(usersContainer['ldp:contains'])) {
        this.logger.info(`Refreshing user ${user.id}...`);
        for (const rule of this.settings.rules) {
          if (this.matchRule(rule, user)) {
            this.logger.info(`Adding user ${user.id} to group ${rule.groupSlug}`);
            await ctx.call('webacl.group.addMember', {
              groupSlug: rule.groupSlug,
              memberUri: user.id,
              webId: 'system'
            });
          } else {
            this.logger.info(`Removing user ${user.id} from group ${rule.groupSlug}`);
            await ctx.call('webacl.group.removeMember', {
              groupSlug: rule.groupSlug,
              memberUri: user.id,
              webId: 'system'
            });
          }
        }
      }
    }
  }
};
