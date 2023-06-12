import React from 'react';
import { SelectInput } from 'react-admin';
import { ReferenceArrayInput } from "@semapps/input-components";

export const UserInput = (props) => (
  <ReferenceArrayInput reference="Person" {...props}>
    <SelectInput optionText="pair:label" fullWidth />
  </ReferenceArrayInput>
);

export const PlaceInput = (props) => (
  <ReferenceArrayInput reference="Place" {...props}>
    <SelectInput optionText="pair:label" fullWidth />
  </ReferenceArrayInput>
);

export const TypeInput = (props) => (
  <ReferenceArrayInput reference="Type" {...props}>
    <SelectInput optionText="pair:label" fullWidth />
  </ReferenceArrayInput>
);
