import React from 'react';
import { EditWithPermissions } from '@semapps/auth-provider';
import PersonForm from './PersonForm';

export const PersonEdit = () => (
  <EditWithPermissions
    transform={data => ({ ...data, 'pair:label': `${data['pair:firstName']} ${data['pair:lastName']?.toUpperCase()}` })}
  >
    <PersonForm />
  </EditWithPermissions>
);

export default PersonEdit;
