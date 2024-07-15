const urlJoin = require('url-join');
const { MIME_TYPES } = require('@semapps/mime-types');
const CONFIG = require('../config/config');

module.exports = {
  name: 'initialization',
  actions: {
    async createAdmin(ctx) {
      const { email } = ctx.params;

      await ctx.call(
        'webid.post',
        {
          containerUri: urlJoin(CONFIG.HOME_URL, 'users'),
          resource: {
            '@type': ['pair:Person', 'foaf:Person'],
            'pair:label': 'Administrateur',
            'pair:firstName': 'Administrateur',
            'pair:e-mail': email,
            'pair:hasType': urlJoin(CONFIG.HOME_URL, 'types', 'admin')
          },
          contentType: MIME_TYPES.JSON
        },
        {
          meta: { webId: 'system' }
        }
      );
    }
  }
};
