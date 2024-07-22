const urlJoin = require('url-join');
const CONFIG = require('./config/config');

// Statuts utilisateurs
const STATUS_EMAIL_VERIFIED = urlJoin(CONFIG.HOME_URL, 'status', 'email-verified');
const STATUS_EMAIL_NOT_VERIFIED = urlJoin(CONFIG.HOME_URL, 'status', 'email-not-verified');
const STATUS_MEMBERSHIP_VERIFIED = urlJoin(CONFIG.HOME_URL, 'status', 'membership-verified');
const STATUS_MEMBERSHIP_NOT_VERIFIED = urlJoin(CONFIG.HOME_URL, 'status', 'membership-not-verified');

// Types utilisateurs
const TYPE_ADMIN = urlJoin(CONFIG.HOME_URL, 'types', 'admin');
const TYPE_ACTOR = urlJoin(CONFIG.HOME_URL, 'types', 'actor');
const TYPE_AGENT = urlJoin(CONFIG.HOME_URL, 'types', 'agent');
const TYPE_MEMBER = urlJoin(CONFIG.HOME_URL, 'types', 'member');

// Statuts annonces
const STATUS_PUBLISHED = urlJoin(CONFIG.HOME_URL, 'status', 'published');
const STATUS_MODERATED = urlJoin(CONFIG.HOME_URL, 'status', 'moderated');
const STATUS_DRAFT = urlJoin(CONFIG.HOME_URL, 'status', 'draft');
const STATUS_REJECTED = urlJoin(CONFIG.HOME_URL, 'status', 'rejected');
const STATUS_EXPIRED = urlJoin(CONFIG.HOME_URL, 'status', 'expired');

// Types annonces
const TYPE_IMMOBILIER = urlJoin(CONFIG.HOME_URL, 'types', 'immobilier');

module.exports = {
  STATUS_EMAIL_VERIFIED,
  STATUS_EMAIL_NOT_VERIFIED,
  STATUS_MEMBERSHIP_VERIFIED,
  STATUS_MEMBERSHIP_NOT_VERIFIED,
  TYPE_ADMIN,
  TYPE_ACTOR,
  TYPE_AGENT,
  TYPE_MEMBER,
  TYPE_IMMOBILIER,
  STATUS_PUBLISHED,
  STATUS_MODERATED,
  STATUS_DRAFT,
  STATUS_REJECTED,
  STATUS_EXPIRED
};
