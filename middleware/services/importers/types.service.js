const urlJoin = require('url-join');
const path = require('path');
const { ImporterMixin } = require('@semapps/importer');
const CONFIG = require('../../config/config');

module.exports = {
  name: 'importers.types',
  mixins: [ImporterMixin],
  settings: {
    source: {
      getAllFull: path.resolve(__dirname, './files/types.json'),
      fieldsMapping: {
        slug: data => data.slug || data['pair:label']
      }
    },
    dest: {
      containerUri: urlJoin(CONFIG.HOME_URL, 'types')
    }
  },
  methods: {
    async transform(data) {
      const { slug, ...rest } = data;
      if (rest['pair:partOf']) rest['pair:partOf'] = urlJoin(CONFIG.HOME_URL, 'types', rest['pair:partOf']);
      return rest;
    }
  }
};
