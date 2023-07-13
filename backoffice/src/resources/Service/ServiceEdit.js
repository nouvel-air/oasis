import React from 'react';
import { EditWithPermissions } from '@semapps/auth-provider';
import ServiceForm from './ServiceForm';

const ServiceEdit = () => (
  <EditWithPermissions redirect="edit">
    <ServiceForm />
  </EditWithPermissions>
);

export default ServiceEdit;
