import React from 'react';
import { Create, SimpleForm, TextInput, FormDataConsumer } from 'react-admin';
import { TypeInput, PlaceInput } from '../../common/input';

const PersonCreate = () => (
  <Create transform={data => ({ ...data, 'pair:label': `${data['pair:firstName']} ${data['pair:lastName']?.toUpperCase()}` })}>
    <SimpleForm>
      <TextInput source="pair:firstName" fullWidth />
      <TextInput source="pair:lastName" fullWidth />
      <TextInput source="pair:e-mail" fullWidth />
      <TypeInput source="pair:hasType" filter={{ a: 'pair:PersonType' }} fullWidth />
      <FormDataConsumer>
        {({ formData, ...rest }) => formData['pair:hasType'] === process.env.REACT_APP_MIDDLEWARE_URL + 'types/actor' &&
          <PlaceInput source="cdlt:proposes" {...rest} />
        }
      </FormDataConsumer>
    </SimpleForm>
  </Create>
);

export default PersonCreate;
