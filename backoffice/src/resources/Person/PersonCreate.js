import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { TypeInput } from '../../common/input';

const PersonCreate = () => (
  <Create transform={data => ({ ...data, 'pair:label': `${data['pair:firstName']} ${data['pair:lastName']?.toUpperCase()}` })}>
    <SimpleForm>
      <TextInput source="pair:firstName" fullWidth />
      <TextInput source="pair:lastName" fullWidth />
      <TextInput source="pair:e-mail" fullWidth />
      <TypeInput source="pair:hasType" filter={{ a: 'pair:PersonType' }} fullWidth />
    </SimpleForm>
  </Create>
);

export default PersonCreate;
