import React from 'react';
import { TextInput, ImageField, email, required } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import { ImageInput } from '@semapps/input-components';
import { StatusInput, UsersInput } from '../../common/input';
import useAccountType from '../../hooks/useAccountType';
import LocationInput from '../../common/input/LocationInput';

const PlaceForm = () => {
  const accountType = useAccountType();
  return (
    <>
      <TextInput source="pair:label" fullWidth validate={[required()]} />
      <MarkdownInput source="pair:description" fullWidth validate={[required()]} isRequired />
      <ImageInput source="pair:depictedBy" accept="image/*" multiple>
        <ImageField source="src" />
      </ImageInput>
      <LocationInput source="pair:hasPostalAddress" validate={[required()]} fullWidth />
      <TextInput source="pair:homePage" fullWidth />
      <TextInput source="pair:e-mail" fullWidth validate={[required(), email()]} />
      {accountType === 'admin' && <UsersInput source="pair:affiliates" fullWidth />}
      <StatusInput
        source="cdlt:hasPublicationStatus"
        filter={{ a: 'cdlt:PublicationStatus' }}
        validate={[required()]}
        label={false}
      />
    </>
  );
};

export default PlaceForm;
