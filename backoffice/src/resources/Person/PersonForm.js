import React from 'react';
import { SimpleForm, TextInput } from 'react-admin';
import { TypeInput } from '../../common/input';

export const PersonForm = () => (
  <SimpleForm>
    <TextInput source="pair:firstName" fullWidth />
    <TextInput source="pair:lastName" fullWidth />
    <TypeInput source="pair:hasType" filter={{ a: 'pair:PersonType' }} fullWidth />
  </SimpleForm>
);

export default PersonForm;
