import React from 'react';
import { Create, SimpleForm } from 'react-admin';
import PlaceForm from './PlaceForm';

const PlaceCreate = () => (
  <Create>
    <SimpleForm defaultValues={{ 'cdlt:hasPublicationStatus': 'https://data.lescheminsdelatransition.org/publication-status/en-cours' }}>
      <PlaceForm />
    </SimpleForm>
  </Create>
);

export default PlaceCreate;
