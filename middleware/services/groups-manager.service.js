const urlJoin = require('url-join');
const { GroupsManagerBot } = require('@semapps/webacl');
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
        match: { 'pair:hasType': TYPE_ACTOR },
        groupSlug: 'actors'
      },
      {
        match: { 'pair:hasType': TYPE_AGENT },
        groupSlug: 'actors'
      },
      {
        match: { 'pair:hasType': TYPE_MEMBER },
        groupSlug: 'actors'
      }
    ]
  }
};
