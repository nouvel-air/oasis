import React from 'react';
import { Edit } from 'react-admin';
import PlaceForm from './PlaceForm';
import PlaceTitle from './PlaceTitle';

const PlaceEdit = props => (
  <Edit title={<PlaceTitle />} {...props}>
    <PlaceForm />
  </Edit>
);

export default PlaceEdit;
