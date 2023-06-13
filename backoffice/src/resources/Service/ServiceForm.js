import React from 'react';
import { TextInput, SimpleForm, ImageField, required } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import { ImageInput } from '@semapps/input-components';
import { PlaceInput, TypeInput } from '../../common/input';

const ServiceForm = () => (
  <SimpleForm>
    <TextInput source="pair:label" fullWidth validate={[required()]} />
    <PlaceInput source="pair:offeredBy" validate={[required()]} />
    <TypeInput source="pair:hasType" filter={{ a: 'cdlt:ServiceType' }} />
    <MarkdownInput source="pair:description" fullWidth />
    <ImageInput source="pair:depictedBy" accept="image/*" validate={[required()]}>
      <ImageField source="src" />
    </ImageInput>
    <TextInput source="cdlt:price" fullWidth validate={[required()]} />
    <TextInput source="cdlt:capacity" fullWidth validate={[required()]} />
    <TextInput source="cdlt:registrationLink" fullWidth />
  </SimpleForm>
);

export default ServiceForm;
