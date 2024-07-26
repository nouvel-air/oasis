import React from 'react';
import { Create, SimpleForm, useGetIdentity } from 'react-admin';
import OfferAndNeedForm from './OfferAndNeedForm';
import { TYPE_ANNONCE_AGENDA } from '../../constants';
import useAccountType from '../../hooks/useAccountType';

const OfferAndNeedCreate = () => {
  const { data: identity } = useGetIdentity();
  const accountType = useAccountType();

  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 6);

  return (
    <Create
      transform={data => ({
        '@type': data?.['pair:hasType'] === TYPE_ANNONCE_AGENDA ? 'pair:Event' : 'cdlt:OfferAndNeed',
        'pair:offeredBy': accountType === 'agent' || accountType === 'member' ? identity?.id : undefined,
        ...data
      })}
    >
      <SimpleForm
        defaultValues={{
          'pair:endDate': endDate.toISOString()
        }}
        warnWhenUnsavedChanges
      >
        <OfferAndNeedForm isCreate />
      </SimpleForm>
    </Create>
  );
};

export default OfferAndNeedCreate;
