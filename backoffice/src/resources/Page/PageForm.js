import React from 'react';
import { SimpleForm, TextInput } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';

const PageForm = () => (
  <SimpleForm>
    <TextInput source="semapps:title" fullWidth />
    <MarkdownInput source="semapps:content" fullWidth />
  </SimpleForm>
);

export default PageForm;
