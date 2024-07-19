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
    }
  },
  {
    path: '/offers-and-needs',
    acceptedTypes: ['cdlt:OfferAndNeed', 'pair:Event'],
    permissions: {
      ...anonReadPermissions,
      ...writePermissionToActors
    }
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
    permissions: {
      ...anonReadPermissions,
      ...writePermissionToActors
    }
  },
  {
    path: '/bots',
    acceptedTypes: ['Application'],
    permissions: anonReadPermissions,
    newResourcesPermissions: anonReadPermissions
  },
  {
    path: '/types',
    acceptedTypes: ['cdlt:ServiceType', 'pair:PersonType'],
    permissions: anonReadPermissions,
    newResourcesPermissions: anonReadPermissions
  },
  {
    path: '/status',
    acceptedTypes: ['pair:ActorStatus'],
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
