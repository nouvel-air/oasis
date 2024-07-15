const path = require('path');
const urlJoin = require('url-join');
const { CoreService } = require('@semapps/core');
const { semapps, as, foaf } = require('@semapps/ontologies');
const CONFIG = require('../config/config');
const containers = require('../config/containers');
const cdlt = require('../config/ontologies/cdlt.json');
const oasis = require('../config/ontologies/oasis.json');
const pair = require('../config/ontologies/pair.json');

module.exports = {
  mixins: [CoreService],
  settings: {
    baseUrl: CONFIG.HOME_URL,
    baseDir: path.resolve(__dirname, '..'),
    triplestore: {
      url: CONFIG.SPARQL_ENDPOINT,
      user: CONFIG.JENA_USER,
      password: CONFIG.JENA_PASSWORD,
      mainDataset: CONFIG.MAIN_DATASET
    },
    containers,
    ontologies: [semapps, as, foaf, cdlt, oasis, pair],
    activitypub: { activitiesPath: '/activities', collectionsPath: '/collections', activateTombstones: false },
    api: { port: CONFIG.PORT },
    ldp: {
      preferredViewForResource: async (resourceUri, containerPreferredView) => {
        if (!containerPreferredView) return resourceUri;
        return urlJoin(CONFIG.FRONTOFFICE_URL, containerPreferredView, encodeURIComponent(resourceUri), 'show');
      }
    },
    void: {
      title: CONFIG.INSTANCE_NAME,
      description: CONFIG.INSTANCE_DESCRIPTION
    },
    webacl: { superAdmins: [] },
    webId: false
  }
};
