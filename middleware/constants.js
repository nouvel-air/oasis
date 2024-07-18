const urlJoin = require('url-join');
const CONFIG = require('./config/config');

const STATUS_EMAIL_VERIFIED = urlJoin(CONFIG.HOME_URL, 'status', 'email-verified');
const STATUS_EMAIL_NOT_VERIFIED = urlJoin(CONFIG.HOME_URL, 'status', 'email-not-verified');
const STATUS_MEMBERSHIP_VERIFIED = urlJoin(CONFIG.HOME_URL, 'status', 'membership-verified');
const STATUS_MEMBERSHIP_NOT_VERIFIED = urlJoin(CONFIG.HOME_URL, 'status', 'membership-not-verified');

const TYPE_ACTOR = urlJoin(CONFIG.HOME_URL, 'types', 'actor');
const TYPE_AGENT = urlJoin(CONFIG.HOME_URL, 'types', 'agent');

module.exports = {
  STATUS_EMAIL_VERIFIED,
  STATUS_EMAIL_NOT_VERIFIED,
  STATUS_MEMBERSHIP_VERIFIED,
  STATUS_MEMBERSHIP_NOT_VERIFIED,
  TYPE_ACTOR,
  TYPE_AGENT
};
