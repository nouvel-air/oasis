const { ControlledContainerMixin } = require('@semapps/ldp');
const { anonReadPermissions } = require('../../config/permissions');
const ProtectedPropertiesMixin = require('../../mixins/protected-properties');

module.exports = {
  name: 'places',
  mixins: [ControlledContainerMixin, ProtectedPropertiesMixin],
  settings: {
    path: '/places',
    acceptedTypes: ['pair:Place'],
    permissions: anonReadPermissions,
    newResourcesPermissions: anonReadPermissions,
    protectedProperties: ['cdlt:exportedTo']
  }
};
