import React from 'react';
import { SimpleForm, TextInput, Edit } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import PageTitle from './PageTitle';

export const PageEdit = props => (
  <Edit title={<PageTitle />} redirect="show" {...props}>
    <SimpleForm>
      <TextInput source="semapps:title" fullWidth />
      <MarkdownInput source="semapps:content" fullWidth />
    </SimpleForm>
  </Edit>
);

export default PageEdit;
