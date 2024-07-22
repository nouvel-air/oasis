import React from 'react';
import { SimpleForm, useGetIdentity } from 'react-admin';
import { CreateWithPermissions } from '@semapps/auth-provider';
import OfferAndNeedForm from './OfferAndNeedForm';
import { TYPE_ANNONCE_AGENDA } from '../../constants';
import useAccountType from '../../hooks/useAccountType';

const OfferAndNeedCreate = () => {
  const { data: identity } = useGetIdentity();
  const accountType = useAccountType();
  return (
    <CreateWithPermissions
      transform={data => ({
        '@type': data?.['pair:hasType'] === TYPE_ANNONCE_AGENDA ? 'pair:Event' : 'cdlt:OfferAndNeed',
        'pair:offeredBy': accountType === 'agent' || accountType === 'member' ? identity?.id : undefined,
        ...data
      })}
    >
      <SimpleForm>
        <OfferAndNeedForm isCreate />
      </SimpleForm>
    </CreateWithPermissions>
  );
};

export default OfferAndNeedCreate;
