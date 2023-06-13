import React from 'react';
import { SimpleForm, TextInput } from 'react-admin';
import { PlacesInput } from '../../common/input';

export const PersonForm = () => (
  <SimpleForm>
    <TextInput source="pair:firstName" fullWidth />
    <TextInput source="pair:lastName" fullWidth />
    <PlacesInput source="cdlt:proposes" fullWidth />
  </SimpleForm>
);

export default PersonForm;
