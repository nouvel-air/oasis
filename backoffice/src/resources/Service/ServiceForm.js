import React from 'react';
import { TextInput, SimpleForm, ImageField, required } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import { ImageInput } from '@semapps/input-components';
import { PlaceInput, TypeInput } from '../../common/input';

const ServiceForm = () => (
  <SimpleForm>
    <PlaceInput source="pair:offeredBy" validate={[required()]} />
    {/* <TypeInput source="pair:hasType" filter={{ a: 'cdlt:ServiceType' }} /> */}
    <TextInput source="cdlt:registrationLink" fullWidth />
    <TextInput source="pair:label" fullWidth validate={[required()]} />
    <TextInput source="cdlt:price" fullWidth validate={[required()]} />
    <TextInput source="cdlt:capacity" fullWidth validate={[required()]} />
    <MarkdownInput source="pair:description" fullWidth validate={[required()]} isRequired />
    <ImageInput source="pair:depictedBy" accept="image/*">
      <ImageField source="src" />
    </ImageInput>
  </SimpleForm>
);

export default ServiceForm;
