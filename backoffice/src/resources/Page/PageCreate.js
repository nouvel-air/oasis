import React from 'react';
import { SimpleForm, TextInput, Create } from 'react-admin';

const PageCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="semapps:title" fullWidth />
    </SimpleForm>
  </Create>
);

export default PageCreate;
