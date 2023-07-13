import React from 'react';
import { SimpleForm } from 'react-admin';
import { CreateWithPermissions } from '@semapps/auth-provider';
import PlaceForm from './PlaceForm';

const PlaceCreate = () => (
  <CreateWithPermissions>
    <SimpleForm defaultValues={{ 'cdlt:hasPublicationStatus': 'https://data.lescheminsdelatransition.org/publication-status/en-cours' }}>
      <PlaceForm />
    </SimpleForm>
  </CreateWithPermissions>
);

export default PlaceCreate;
