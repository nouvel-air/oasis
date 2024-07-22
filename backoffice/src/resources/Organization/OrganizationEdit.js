import React from 'react';
import { EditWithPermissions } from '@semapps/auth-provider';
import OrganizationForm from './OrganizationForm';

export const OrganizationEdit = () => (
  <EditWithPermissions>
    <OrganizationForm />
  </EditWithPermissions>
);

export default OrganizationEdit;
