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
    formUrl: CONFIG.FRONT_URL ? urlJoin(CONFIG.FRONT_URL, 'login') : undefined,
  }
};
