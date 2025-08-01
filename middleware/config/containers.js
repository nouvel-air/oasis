const { rootPermissions, anonReadPermissions, writePermissionToActors } = require('./permissions');

module.exports = [
  {
    path: '/',
    permissions: rootPermissions,
    newResourcesPermissions: anonReadPermissions
  },
  {
    path: '/regions',
    acceptedTypes: ['pair:Place'],
    permissions: anonReadPermissions,
    newResourcesPermissions: anonReadPermissions
  },
  {
    path: '/groups',
    acceptedTypes: ['pair:Group'],
    permissions: {
      ...anonReadPermissions,
      ...writePermissionToActors
    }
  },
  {
    path: '/organizations',
    acceptedTypes: ['pair:Organization'],
    permissions: anonReadPermissions,
    newResourcesPermissions: anonReadPermissions
  },
  {
    path: '/types',
    acceptedTypes: ['cdlt:ServiceType', 'pair:PersonType', 'cdlt:OfferAndNeedType'],
    permissions: anonReadPermissions,
    newResourcesPermissions: anonReadPermissions
  },
  {
    path: '/status',
    acceptedTypes: ['pair:ActorStatus', 'cdlt:PublicationStatus'],
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
