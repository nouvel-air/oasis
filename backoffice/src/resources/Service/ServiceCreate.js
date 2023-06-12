import React from 'react';
import { Create } from 'react-admin';
import ServiceForm from './ServiceForm';

const ServiceCreate = props => (
  <Create {...props}>
    <ServiceForm />
  </Create>
);

export default ServiceCreate;
