const { rootPermissions, anonReadPermissions, writePermissionToActors } = require('./permissions');

module.exports = [
  {
    path: '/',
    permissions: rootPermissions,
    newResourcesPermissions: anonReadPermissions
  },
  {
    path: '/places',
    acceptedTypes: ['pair:Place'],
    dereference: ['pair:hasPostalAddress'],
    permissions: anonReadPermissions,
    newResourcesPermissions: anonReadPermissions
  },
    {
    path: '/regions',
    acceptedTypes: ['pair:Place'],
    permissions: anonReadPermissions,
    newResourcesPermissions: anonReadPermissions
  },
  {
    path: '/services',
    acceptedTypes: ['cdlt:Service', 'cdlt:HostingService'],
    permissions: {
      ...anonReadPermissions,
      ...writePermissionToActors
    },
    newResourcesPermissions: anonReadPermissions
  },
  {
    path: '/bots',
    acceptedTypes: ['Application'],
    dereference: ['sec:publicKey'],
    permissions: anonReadPermissions,
    newResourcesPermissions: anonReadPermissions
  },
  {
    path: '/types',
    acceptedTypes: [
      'cdlt:ServiceType',
      'pair:PersonType'
    ],
    permissions: anonReadPermissions,
    newResourcesPermissions: anonReadPermissions
  },
  {
    path: '/pages',
    acceptedTypes: ['semapps:Page'],
    permissions: anonReadPermissions,
    newResourcesPermissions: anonReadPermissions
  }
];
