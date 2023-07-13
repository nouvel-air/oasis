import React from 'react';
import { SimpleForm, TextInput, SelectArrayInput } from 'react-admin';
import { CreateWithPermissions } from '@semapps/auth-provider';

const TypeCreate = () => (
  <CreateWithPermissions>
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
  </CreateWithPermissions>
);

export default TypeCreate;
