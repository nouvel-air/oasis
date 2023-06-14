const path = require('path');
const urlJoin = require('url-join');
const { AuthLocalService } = require('@semapps/auth');
const CONFIG = require('../config/config');

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
          pass: CONFIG.SMTP_PASS,
        },
      },
      defaults: {
        locale: 'fr',
        // TODO handle redirect to frontoffice when necessary
        frontUrl: CONFIG.BACKOFFICE_URL,
      },
    }
  }
};
