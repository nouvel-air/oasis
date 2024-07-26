import React from 'react';
import { SimpleForm, Edit } from 'react-admin';
import PersonForm from './PersonForm';
import PersonToolbar from './PersonToolbar';

export const PersonEdit = () => (
  <Edit
    transform={data => ({ ...data, 'pair:label': `${data['pair:firstName']} ${data['pair:lastName']?.toUpperCase()}` })}
  >
    <SimpleForm toolbar={<PersonToolbar />} warnWhenUnsavedChanges>
      <PersonForm />
    </SimpleForm>
  </Edit>
);

export default PersonEdit;
