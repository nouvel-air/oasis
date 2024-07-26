import React from 'react';
import { Edit, SimpleForm } from 'react-admin';
import ServiceForm from './ServiceForm';

const ServiceEdit = () => (
  <Edit redirect="list">
    <SimpleForm warnWhenUnsavedChanges>
      <ServiceForm />
    </SimpleForm>
  </Edit>
);

export default ServiceEdit;
