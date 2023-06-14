import React from 'react';
import { Edit } from 'react-admin';
import ServiceForm from './ServiceForm';
import ServiceTitle from './ServiceTitle';

const ServiceEdit = () => (
  <Edit redirect="edit" title={<ServiceTitle />}>
    <ServiceForm />
  </Edit>
);

export default ServiceEdit;
