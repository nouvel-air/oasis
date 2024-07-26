import React from 'react';
import { SimpleForm, Create } from 'react-admin';
import PersonForm from './PersonForm';

const PersonCreate = () => (
  <Create
    transform={data => ({ ...data, 'pair:label': `${data['pair:firstName']} ${data['pair:lastName']?.toUpperCase()}` })}
  >
    <SimpleForm warnWhenUnsavedChanges>
      <PersonForm isCreate />
    </SimpleForm>
  </Create>
);

export default PersonCreate;
