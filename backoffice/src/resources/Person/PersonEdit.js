import React from 'react';
import { Edit } from 'react-admin';
import PersonTitle from './PersonTitle';
import PersonForm from './PersonForm';

export const PersonEdit = () => (
  <Edit
    title={<PersonTitle />}
    transform={data => ({ ...data, 'pair:label': `${data['pair:firstName']} ${data['pair:lastName']?.toUpperCase()}` })}
  >
    <PersonForm />
  </Edit>
);

export default PersonEdit;
