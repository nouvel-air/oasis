import React from 'react';
import { Edit, SimpleForm } from 'react-admin';
import OrganizationForm from './OrganizationForm';
import EditToolbar from '../../common/toolbar/EditToolbar';

export const OrganizationEdit = () => (
  <Edit>
    <SimpleForm toolbar={<EditToolbar adminOnlyDelete />}>
      <OrganizationForm />
    </SimpleForm>
  </Edit>
);

export default OrganizationEdit;
