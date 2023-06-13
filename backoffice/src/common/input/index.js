import React from 'react';
import { SelectInput, AutocompleteArrayInput } from 'react-admin';
import { ReferenceInput, ReferenceArrayInput } from "@semapps/input-components";

const ifTwoLetters = ({ q }) => !!(q && q.length > 1);

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

export const PlacesInput = (props) => (
  <ReferenceArrayInput reference="Place" enableGetChoices={ifTwoLetters} {...props}>
    <AutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={(value) => value.length > 1} fullWidth />
  </ReferenceArrayInput>
);

export const TypeInput = (props) => (
  <ReferenceInput reference="Type" {...props}>
    <SelectInput optionText="pair:label" fullWidth />
  </ReferenceInput>
);
