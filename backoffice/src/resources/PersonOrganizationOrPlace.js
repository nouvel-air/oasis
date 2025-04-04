import urlJoin from 'url-join';

export default {
  dataModel: {
    types: ['pair:Person', 'pair:Organization', 'pair:Place'],
    list: {
      containers: [
        urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, '/users'),
        urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, '/organizations'),
        urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, '/places')
      ]
    }
  }
};
