import React from 'react';
import { SimpleForm, TextInput, email, required } from 'react-admin';
import { GroupInput, UsersInput } from '../../common/input';
import useIsAdmin from '../../hooks/useIsAdmin';

export const OrganizationForm = () => {
  const isAdmin = useIsAdmin();
  return (
    <SimpleForm>
      <TextInput source="pair:label" fullWidth validate={[required()]} />
      <GroupInput source="pair:partOf" validate={[required()]} disabled={!isAdmin} />
      <TextInput source="pair:e-mail" fullWidth validate={[required(), email()]} />
      <UsersInput source="pair:affiliates" />
    </SimpleForm>
  );
};

export default OrganizationForm;
