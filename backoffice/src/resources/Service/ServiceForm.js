import React from 'react';
import { TextInput, required, useGetIdentity } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import ImageInput from '../../common/input/ImageInput';
import { PlaceInput, TypeInput } from '../../common/input';

import useAccountType from '../../hooks/useAccountType';

const ServiceForm = () => {
  const accountType = useAccountType();
  const { identity } = useGetIdentity();
  if (!identity?.id) return;
  return (
    <>
      <TextInput source="pair:label" fullWidth validate={[required()]} />
      <PlaceInput
        source="pair:offeredBy"
        validate={[required()]}
        filter={accountType === 'admin' ? {} : { 'pair:affiliates': identity?.id }}
      />
      <TypeInput source="cdlt:hasServiceType" filter={{ a: 'cdlt:ServiceType' }} />
      <MarkdownInput source="pair:description" fullWidth />
      <ImageInput source="pair:depictedBy" validate={[required()]} />
      <TextInput source="cdlt:price" fullWidth validate={[required()]} />
      <TextInput source="cdlt:capacity" fullWidth validate={[required()]} />
      <TextInput source="cdlt:registrationLink" fullWidth />
    </>
  );
};

export default ServiceForm;
