import React from 'react';
import { EditWithPermissions } from '@semapps/auth-provider';
import OrganizationForm from './OrganizationForm';

export const OrganizationEdit = () => (
  <EditWithPermissions
    transform={data => ({ ...data, 'pair:label': `${data['pair:firstName']} ${data['pair:lastName']?.toUpperCase()}` })}
  >
    <OrganizationForm />
  </EditWithPermissions>
);

export default OrganizationEdit;
