import React from 'react';
import { SimpleForm } from 'react-admin';
import { EditWithPermissions } from '@semapps/auth-provider';
import OfferAndNeedForm from './OfferAndNeedForm';

const OfferAndNeedEdit = () => (
  <EditWithPermissions redirect="list">
    <SimpleForm>
      <OfferAndNeedForm />
    </SimpleForm>
  </EditWithPermissions>
);

export default OfferAndNeedEdit;
