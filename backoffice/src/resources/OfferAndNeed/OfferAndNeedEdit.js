import React from 'react';
import { SimpleForm, Edit } from 'react-admin';
import OfferAndNeedForm from './OfferAndNeedForm';
import EditToolbar from '../../common/toolbar/EditToolbar';

const OfferAndNeedEdit = () => (
  <Edit redirect="list">
    <SimpleForm toolbar={<EditToolbar />} warnWhenUnsavedChanges>
      <OfferAndNeedForm />
    </SimpleForm>
  </Edit>
);

export default OfferAndNeedEdit;
