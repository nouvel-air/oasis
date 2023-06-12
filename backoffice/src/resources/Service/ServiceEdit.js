import React from 'react';
import { Edit } from 'react-admin';
import ServiceForm from './ServiceForm';
import ServiceTitle from './ServiceTitle';

const ServiceEdit = props => (
  <Edit title={<ServiceTitle />} {...props}>
    <ServiceForm />
  </Edit>
);

export default ServiceEdit;
