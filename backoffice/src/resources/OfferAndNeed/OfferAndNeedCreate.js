import React from 'react';
import { SimpleForm } from 'react-admin';
import { CreateWithPermissions } from '@semapps/auth-provider';
import OfferAndNeedForm from './OfferAndNeedForm';
import { TYPE_ANNONCE_EVENEMENT } from '../../constants';

const transform = data => ({
  '@type': data?.['pair:hasType'] === TYPE_ANNONCE_EVENEMENT ? 'pair:Event' : 'cdlt:OfferAndNeed',
  ...data
});

const OfferAndNeedCreate = () => (
  <CreateWithPermissions transform={transform}>
    <SimpleForm>
      <OfferAndNeedForm />
    </SimpleForm>
  </CreateWithPermissions>
);

export default OfferAndNeedCreate;
