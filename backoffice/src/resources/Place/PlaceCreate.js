import React from 'react';
import { Create, SimpleForm } from 'react-admin';
import PlaceForm from './PlaceForm';

const PlaceCreate = () => (
  <Create>
    <SimpleForm>
      <PlaceForm />
    </SimpleForm>
  </Create>
);

export default PlaceCreate;
