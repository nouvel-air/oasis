import React from 'react';
import { Create } from 'react-admin';
import PlaceForm from './PlaceForm';

const PlaceCreate = props => (
  <Create {...props}>
    <PlaceForm />
  </Create>
);

export default PlaceCreate;
