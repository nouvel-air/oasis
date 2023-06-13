import React from 'react';
import { SelectInput } from 'react-admin';
import { ReferenceInput } from "@semapps/input-components";

export const UserInput = (props) => (
  <ReferenceInput reference="Person" {...props}>
    <SelectInput optionText="pair:label" fullWidth />
  </ReferenceInput>
);

export const PlaceInput = ({ validate, ...rest }) => (
  <ReferenceInput reference="Place" {...rest}>
    <SelectInput optionText="pair:label" validate={validate} fullWidth />
  </ReferenceInput>
);

export const TypeInput = (props) => (
  <ReferenceInput reference="Type" {...props}>
    <SelectInput optionText="pair:label" fullWidth />
  </ReferenceInput>
);
