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
const STATUS_PUBLISHED = 'https://data.lescheminsdelatransition.org/publication-status/valide';
const STATUS_UNPUBLISHED = 'https://data.lescheminsdelatransition.org/publication-status/en-cours';

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
  STATUS_UNPUBLISHED
};
