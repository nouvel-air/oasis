import React from 'react';
import { Create, SimpleForm } from 'react-admin';
import PlaceForm from './PlaceForm';
import { STATUS_DRAFT, GROUP_OASIS } from '../../constants';

const PlaceCreate = () => (
  <Create>
    <SimpleForm
      defaultValues={{ 'cdlt:hasPublicationStatus': STATUS_DRAFT, 'pair:partOf': GROUP_OASIS }}
      warnWhenUnsavedChanges
    >
      <PlaceForm />
    </SimpleForm>
  </Create>
);

export default PlaceCreate;
