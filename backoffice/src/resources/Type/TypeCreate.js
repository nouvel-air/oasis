import React from 'react';
import { SimpleForm, TextInput, SelectArrayInput, Create } from 'react-admin';

const TypeCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="pair:label" fullWidth />
      <SelectArrayInput
        source="@type"
        choices={[
          { id: 'cdlt:ServiceType', name: 'ServiceType' },
          { id: 'pair:PersonType', name: 'PersonType' },
        ]}
      />
    </SimpleForm>
  </Create>
);

export default TypeCreate;
