import React from 'react';
import { SimpleForm, TextInput } from 'react-admin';
import { PlacesInput } from '../../common/input';
import useIsAdmin from '../../hooks/useIsAdmin';

export const PersonForm = () => {
  const isAdmin = useIsAdmin();
  return (
    <SimpleForm>
      <TextInput source="pair:firstName" fullWidth />
      <TextInput source="pair:lastName" fullWidth />
      {isAdmin && <PlacesInput source="cdlt:proposes" fullWidth />}
    </SimpleForm>
  );
};

export default PersonForm;
