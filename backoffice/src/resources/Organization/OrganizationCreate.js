import React from 'react';
import { Create, SimpleForm } from 'react-admin';
import OrganizationForm from './OrganizationForm';

const OrganizationCreate = () => (
  <Create>
    <SimpleForm warnWhenUnsavedChanges>
      <OrganizationForm />
    </SimpleForm>
  </Create>
);

export default OrganizationCreate;
