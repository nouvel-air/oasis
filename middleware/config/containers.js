const { rootPermissions, anonReadPermissions, writePermissionToActors } = require('./permissions');

module.exports = [
  {
    path: '/',
    permissions: rootPermissions
  },
  {
    path: '/places',
    acceptedTypes: ['pair:Place'],
    dereference: ['pair:hasPostalAddress'],
    permissions: anonReadPermissions
  },
    {
    path: '/regions',
    acceptedTypes: ['pair:Place'],
    permissions: anonReadPermissions
  },
  {
    path: '/services',
    acceptedTypes: ['cdlt:Service', 'cdlt:HostingService'],
    permissions: {
      ...anonReadPermissions,
      ...writePermissionToActors
    }
  },
  {
    path: '/bots',
    acceptedTypes: ['Application'],
    dereference: ['sec:publicKey'],
    permissions: anonReadPermissions
  },
  {
    path: '/types',
    acceptedTypes: [
      'cdlt:ServiceType',
      'pair:PersonType'
    ],
    permissions: anonReadPermissions
  },
  {
    path: '/pages',
    acceptedTypes: ['semapps:Page'],
    permissions: anonReadPermissions
  }
];
