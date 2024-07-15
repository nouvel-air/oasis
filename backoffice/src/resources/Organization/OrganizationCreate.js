import React from 'react';
import { CreateWithPermissions } from '@semapps/auth-provider';
import OrganizationForm from './OrganizationForm';

const OrganizationCreate = () => (
  <CreateWithPermissions>
    <OrganizationForm />
  </CreateWithPermissions>
);

export default OrganizationCreate;
