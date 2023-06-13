const { defaultToArray } = require('@semapps/ldp');
const { AuthorizerBot } = require('@semapps/webacl');

module.exports = {
  mixins: [AuthorizerBot],
  settings: {
    rules: [
      {
        key: 'place',
        match: { type: 'pair:Place' },
        rights: {
          read: true,
          write: true
        },
        users: record => record['cdlt:proposedBy']
      },
      {
        key: 'person',
        match: { type: 'pair:Person' },
        rights: {
          read: true,
          write: true,
          control: true
        },
        users: record => record.id || record['@id']
      }
    ]
  },
  events: {
    async 'authorizer.added'(ctx) {
      const { resourceUri, users, rule } = ctx.params;
      console.log('authorizer.added', ctx.params);
      if (rule.key === 'place') {
        const place = await ctx.call('ldp.resource.get', {
          resourceUri,
          accept: MIME_TYPES.JSON
        });
        if (place['pair:offers']) {
          const servicesUris = defaultToArray(place['pair:offers']);
          for (let serviceUri of servicesUris) {
            for (let userUri of users) {
              await ctx.call('webacl.resource.addRights', {
                resourceUri: serviceUri,
                additionalRights: {
                  user: {
                    uri: userUri,
                    ...rule.rights
                  }
                },
                webId: 'system'
              });
            }
          }
        }
      }
    },
    async 'authorizer.removed'(ctx) {
      const { resourceUri, users, rule } = ctx.params;
      console.log('authorizer.removed', ctx.params);
      if (rule.key === 'place') {
        const place = await ctx.call('ldp.resource.get', {
          resourceUri,
          accept: MIME_TYPES.JSON
        });
        if (place['pair:offers']) {
          const servicesUris = defaultToArray(place['pair:offers']);
          for (let serviceUri of servicesUris) {
            for (let userUri of users) {
              await ctx.call('webacl.resource.removeRights', {
                resourceUri: serviceUri,
                additionalRights: {
                  user: {
                    uri: userUri,
                    ...rule.rights
                  }
                },
                webId: 'system'
              });
            }
          }
        }
      }
    }
  }
};
