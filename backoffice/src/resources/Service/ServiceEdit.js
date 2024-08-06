import React from 'react';
import { Edit, SimpleForm } from 'react-admin';
import ServiceForm from './ServiceForm';

const ServiceEdit = () => (
  <Edit redirect="list">
    <SimpleForm>
      <ServiceForm />
    </SimpleForm>
  </Edit>
);

export default ServiceEdit;
