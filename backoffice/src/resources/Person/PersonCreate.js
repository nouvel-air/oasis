import React from 'react';
import { CreateWithPermissions } from '@semapps/auth-provider';
import PersonForm from './PersonForm';

const PersonCreate = () => (
  <CreateWithPermissions
    transform={data => ({ ...data, 'pair:label': `${data['pair:firstName']} ${data['pair:lastName']?.toUpperCase()}` })}
  >
    <PersonForm isCreate />
  </CreateWithPermissions>
);

export default PersonCreate;
