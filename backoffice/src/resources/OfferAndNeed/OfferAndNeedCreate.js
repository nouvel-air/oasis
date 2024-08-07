import React from 'react';
import { Create, SimpleForm, useGetIdentity } from 'react-admin';
import OfferAndNeedForm from './OfferAndNeedForm';
import { TYPE_ANNONCE_AGENDA, TYPE_ANNONCE_IMMOBILIER } from '../../constants';
import useAccountType from '../../hooks/useAccountType';

const OfferAndNeedCreate = () => {
  const { data: identity } = useGetIdentity();
  const accountType = useAccountType();

  return (
    <Create
      transform={data => ({
        '@type': data?.['pair:hasType'] === TYPE_ANNONCE_AGENDA ? 'pair:Event' : 'cdlt:OfferAndNeed',
        'pair:offeredBy': accountType === 'agent' || accountType === 'member' ? identity?.id : undefined,
        ...data
      })}
    >
      <SimpleForm defaultValues={accountType === 'agent' ? { 'pair:hasType': TYPE_ANNONCE_IMMOBILIER } : {}}>
        <OfferAndNeedForm isCreate />
      </SimpleForm>
    </Create>
  );
};

export default OfferAndNeedCreate;
