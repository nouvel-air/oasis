import React from 'react';
import { CreateWithPermissions } from '@semapps/auth-provider';
import PageForm from './PageForm';

const PageCreate = () => (
  <CreateWithPermissions>
    <PageForm />
  </CreateWithPermissions>
);

export default PageCreate;
