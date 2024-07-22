import React from 'react';
import { SimpleForm } from 'react-admin';
import { CreateWithPermissions } from '@semapps/auth-provider';
import PlaceForm from './PlaceForm';
import { STATUS_DRAFT, GROUP_OASIS } from '../../constants';

const PlaceCreate = () => (
  <CreateWithPermissions>
    <SimpleForm defaultValues={{ 'cdlt:hasPublicationStatus': STATUS_DRAFT, 'pair:partOf': GROUP_OASIS }}>
      <PlaceForm />
    </SimpleForm>
  </CreateWithPermissions>
);

export default PlaceCreate;
