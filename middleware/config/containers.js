const { rootPermissions } = require('./permissions');

module.exports = [
  {
    path: '/',
    permissions: rootPermissions
  },
  {
    path: '/places',
    acceptedTypes: ['pair:Place'],
    dereference: ['pair:hasPostalAddress']
  },
    {
    path: '/regions',
    acceptedTypes: ['pair:Place'],
  },
  {
    path: '/services',
    acceptedTypes: ['cdlt:Service', 'cdlt:HostingService'],
  },
  {
    path: '/bots',
    acceptedTypes: ['Application'],
    dereference: ['sec:publicKey']
  },
  {
    path: '/types',
    acceptedTypes: [
      'cdlt:ServiceType',
      'pair:PersonType'
    ]
  },
  {
    path: '/pages',
    acceptedTypes: ['semapps:Page']
  }
];
