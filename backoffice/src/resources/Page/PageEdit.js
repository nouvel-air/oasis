import React from 'react';
import { EditWithPermissions } from '@semapps/auth-provider';
import PageForm from './PageForm';

export const PageEdit = () => (
  <EditWithPermissions>
    <PageForm />
  </EditWithPermissions>
);

export default PageEdit;
