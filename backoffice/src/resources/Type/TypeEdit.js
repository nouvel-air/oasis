import React from 'react';
import { SimpleForm, TextInput, Edit } from 'react-admin';

export const ThemeEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="pair:label" fullWidth />
    </SimpleForm>
  </Edit>
);

export default ThemeEdit;
