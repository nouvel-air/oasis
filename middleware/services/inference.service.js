const { InferenceService } = require('@semapps/inference');
const ontologies = require('../config/ontologies');
const CONFIG = require('../config/config');

module.exports = {
  mixins: [InferenceService],
  settings: {
    baseUrl: CONFIG.HOME_URL,
    ontologies
  }
};
