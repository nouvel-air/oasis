import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
import TypeTitle from './TypeTitle';

export const ThemeEdit = props => (
  <Edit title={<TypeTitle />} {...props}>
    <SimpleForm>
      <TextInput source="pair:label" fullWidth />
    </SimpleForm>
  </Edit>
);

export default ThemeEdit;
