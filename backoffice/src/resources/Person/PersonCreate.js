import React from 'react';
import { Create, SimpleForm, TextInput, FormDataConsumer, required } from 'react-admin';
import { TypeInput, PlaceInput } from '../../common/input';

const PersonCreate = () => (
  <Create transform={data => ({ ...data, 'pair:label': `${data['pair:firstName']} ${data['pair:lastName']?.toUpperCase()}` })}>
    <SimpleForm>
      <TextInput source="pair:firstName" fullWidth validate={required()} />
      <TextInput source="pair:lastName" fullWidth validate={required()} />
      <TextInput source="pair:e-mail" fullWidth validate={required()} />
      <TypeInput source="pair:hasType" filter={{ a: 'pair:PersonType' }} validate={required()} fullWidth />
      <FormDataConsumer>
        {({ formData, ...rest }) => formData['pair:hasType'] === process.env.REACT_APP_MIDDLEWARE_URL + 'types/actor' &&
          <PlaceInput source="cdlt:proposes" validate={required()} {...rest} />
        }
      </FormDataConsumer>
    </SimpleForm>
  </Create>
);

export default PersonCreate;
