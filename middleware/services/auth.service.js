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
    formUrl: CONFIG.BACKOFFICE_URL ? urlJoin(CONFIG.BACKOFFICE_URL, 'login') : undefined,
  }
};
