import React from 'react';
import { Edit } from 'react-admin';
import PageTitle from './PageTitle';
import PageForm from './PageForm';

export const PageEdit = () => (
  <Edit title={<PageTitle />}>
    <PageForm />
  </Edit>
);

export default PageEdit;
