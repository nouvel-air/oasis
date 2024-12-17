import React from 'react';
import { Create, SimpleForm } from 'react-admin';
import OrganizationForm from './OrganizationForm';

const OrganizationCreate = () => (
  <Create>
    <SimpleForm>
      <OrganizationForm isCreate />
    </SimpleForm>
  </Create>
);

export default OrganizationCreate;
