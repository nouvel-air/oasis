const { ControlledContainerMixin } = require('@semapps/ldp');
const { anonReadPermissions, writePermissionToActors } = require('../../config/permissions');
const ProtectedPropertiesMixin = require('../../mixins/protected-properties');

module.exports = {
  name: 'services',
  mixins: [ControlledContainerMixin, ProtectedPropertiesMixin],
  settings: {
    path: '/services',
    acceptedTypes: ['cdlt:Service', 'cdlt:HostingService'],
    permissions: {
      ...anonReadPermissions,
      ...writePermissionToActors
    },
    protectedProperties: ['cdlt:exportedTo']
  }
};
