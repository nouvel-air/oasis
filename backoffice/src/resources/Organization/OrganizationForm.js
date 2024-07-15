import React from 'react';
import { SimpleForm, TextInput, email, required } from 'react-admin';
import { GroupInput, UsersInput } from '../../common/input';

export const OrganizationForm = () => (
  <SimpleForm>
    <TextInput source="pair:label" fullWidth validate={[required()]} />
    <GroupInput source="pair:partOf" validate={[required()]} />
    <TextInput source="pair:e-mail" fullWidth validate={[required(), email()]} />
    <UsersInput source="pair:affiliates" />
  </SimpleForm>
);

export default OrganizationForm;
