import React from 'react';
import { TextInput, email, required } from 'react-admin';
import { GroupInput, UsersInput } from '../../common/input';
import useAccountType from '../../hooks/useAccountType';
import { TYPE_ACTOR } from '../../constants';

export const OrganizationForm = () => {
  const accountType = useAccountType();
  return (
    <>
      <TextInput source="pair:label" fullWidth validate={[required()]} />
      <GroupInput source="pair:partOf" validate={[required()]} disabled={accountType !== 'admin'} />
      <TextInput source="pair:e-mail" fullWidth validate={[required(), email()]} />
      <UsersInput source="pair:affiliates" filter={{ 'pair:hasType': TYPE_ACTOR }} disabled />
    </>
  );
};

export default OrganizationForm;
