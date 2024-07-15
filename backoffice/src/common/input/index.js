import React from 'react';
import { SelectInput, AutocompleteArrayInput } from 'react-admin';
import { ReferenceInput, ReferenceArrayInput } from '@semapps/input-components';

const ifTwoLetters = ({ q }) => !!(q && q.length > 1);

export const UserInput = props => (
  <ReferenceInput reference="Person" {...props}>
    <SelectInput optionText="pair:label" fullWidth />
  </ReferenceInput>
);

export const UsersInput = props => (
  <ReferenceArrayInput reference="Person" enableGetChoices={ifTwoLetters} {...props}>
    <AutocompleteArrayInput
      optionText="pair:label"
      shouldRenderSuggestions={value => value.length > 1}
      noOptionsText="Tapez deux lettres..."
      fullWidth
    />
  </ReferenceArrayInput>
);

export const PlaceInput = ({ validate, ...rest }) => (
  <ReferenceInput reference="Place" {...rest}>
    <SelectInput optionText="pair:label" validate={validate} fullWidth />
  </ReferenceInput>
);

export const PlacesInput = props => (
  <ReferenceArrayInput reference="Place" enableGetChoices={ifTwoLetters} {...props}>
    <AutocompleteArrayInput
      optionText="pair:label"
      shouldRenderSuggestions={value => value.length > 1}
      noOptionsText="Tapez deux lettres..."
      fullWidth
    />
  </ReferenceArrayInput>
);

export const TypeInput = ({ validate, ...rest }) => (
  <ReferenceInput reference="Type" {...rest}>
    <SelectInput optionText="pair:label" validate={validate} fullWidth />
  </ReferenceInput>
);

export const StatusInput = ({ validate, ...rest }) => (
  <ReferenceInput reference="Status" {...rest}>
    <SelectInput optionText="pair:label" validate={validate} fullWidth />
  </ReferenceInput>
);

export const GroupInput = ({ validate, ...rest }) => (
  <ReferenceInput reference="Group" {...rest}>
    <SelectInput optionText="pair:label" validate={validate} fullWidth />
  </ReferenceInput>
);
