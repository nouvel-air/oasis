const urlJoin = require('url-join');
const path = require('path');
const { ImporterMixin } = require('@semapps/importer');
const CONFIG = require('../../config/config');

module.exports = {
  name: 'importers.groups',
  mixins: [ImporterMixin],
  settings: {
    source: {
      getAllFull: path.resolve(__dirname, './files/groups.json'),
      fieldsMapping: {
        slug: data => data.slug || data['pair:label']
      }
    },
    dest: {
      containerUri: urlJoin(CONFIG.HOME_URL, 'groups')
    }
  },
  methods: {
    async transform(data) {
      const { slug, ...otherData } = data;
      return otherData;
    }
  }
};
