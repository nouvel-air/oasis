import React from 'react';
import {
  SelectInput,
  AutocompleteArrayInput,
  CheckboxGroupInput,
  RadioButtonGroupInput,
  AutocompleteInput
} from 'react-admin';
import { ReferenceInput, ReferenceArrayInput } from '@semapps/input-components';

const ifTwoLetters = ({ q }) => !!(q && q.length > 1);

export const UserInput = props => (
  <ReferenceInput reference="Person" perPage={1000} sort={{ field: 'pair:label', order: 'ASC' }} {...props}>
    <SelectInput optionText="pair:label" fullWidth />
  </ReferenceInput>
);

export const UsersInput = ({ validate, disabled, ...rest }) => (
  <ReferenceArrayInput
    reference="Person"
    enableGetChoices={ifTwoLetters}
    sort={{ field: 'pair:label', order: 'ASC' }}
    perPage={1000}
    {...rest}
  >
    <AutocompleteArrayInput
      optionText="pair:label"
      shouldRenderSuggestions={value => value.length > 1}
      noOptionsText="Tapez deux lettres..."
      fullWidth
      disabled={disabled}
      validate={validate}
    />
  </ReferenceArrayInput>
);

export const PlaceInput = ({ validate, ...rest }) => (
  <ReferenceInput reference="Place" perPage={1000} sort={{ field: 'pair:label', order: 'ASC' }} {...rest}>
    <SelectInput optionText="pair:label" validate={validate} fullWidth />
  </ReferenceInput>
);

export const PlacesInput = props => (
  <ReferenceArrayInput reference="Place" enableGetChoices={ifTwoLetters} perPage={1000} {...props}>
    <AutocompleteArrayInput
      optionText="pair:label"
      shouldRenderSuggestions={value => value.length > 1}
      noOptionsText="Tapez deux lettres..."
      fullWidth
    />
  </ReferenceArrayInput>
);

export const TypeInput = ({ validate, disabled, ...rest }) => (
  <ReferenceInput reference="Type" perPage={1000} sort={{ field: 'pair:label', order: 'ASC' }} {...rest}>
    <SelectInput optionText="pair:label" validate={validate} disabled={disabled} fullWidth />
  </ReferenceInput>
);

export const StatusInput = ({ validate, label, disabled, sx, ...rest }) => (
  <ReferenceInput reference="Status" perPage={1000} sort={{ field: 'pair:label', order: 'ASC' }} {...rest}>
    <RadioButtonGroupInput optionText="pair:label" label={label} disabled={disabled} validate={validate} sx={sx} />
  </ReferenceInput>
);

export const StatusesInput = ({ validate, label, helperText, ...rest }) => (
  <ReferenceArrayInput reference="Status" perPage={1000} sort={{ field: 'pair:label', order: 'ASC' }} {...rest}>
    <CheckboxGroupInput optionText="pair:label" validate={validate} label={label} helperText={helperText} fullWidth />
  </ReferenceArrayInput>
);

export const OrganizationInput = ({ validate, label, disabled, helperText, ...rest }) => (
  <ReferenceInput reference="Organization" perPage={1000} sort={{ field: 'pair:label', order: 'ASC' }} {...rest}>
    <SelectInput
      optionText="pair:label"
      validate={validate}
      label={label}
      disabled={disabled}
      helperText={helperText}
      fullWidth
    />
  </ReferenceInput>
);

export const PersonOrganizationOrPlaceInput = ({ validate, label, disabled, helperText, ...rest }) => (
  <ReferenceInput
    reference="PersonOrganizationOrPlace"
    perPage={1000}
    sort={{ field: 'pair:label', order: 'ASC' }}
    {...rest}
  >
    <SelectInput
      optionText="pair:label"
      validate={validate}
      label={label}
      disabled={disabled}
      helperText={helperText}
      fullWidth
    />
  </ReferenceInput>
);

export const OrganizationOrPlaceInput = ({ validate, label, disabled, helperText, ...rest }) => (
  <ReferenceInput reference="OrganizationOrPlace" perPage={1000} sort={{ field: 'pair:label', order: 'ASC' }} {...rest}>
    <SelectInput
      optionText="pair:label"
      validate={validate}
      label={label}
      disabled={disabled}
      helperText={helperText}
      fullWidth
    />
  </ReferenceInput>
);

export const OrganizationOrPlaceAutocompleteInput = ({ validate, label, disabled, helperText, ...rest }) => (
  <ReferenceInput reference="OrganizationOrPlace" perPage={1000} sort={{ field: 'pair:label', order: 'ASC' }} {...rest}>
    <AutocompleteInput
      optionText="pair:label"
      shouldRenderSuggestions={value => value.length > 1}
      noOptionsText="Tapez deux lettres..."
      validate={validate}
      label={label}
      disabled={disabled}
      helperText={helperText}
      fullWidth
    />
  </ReferenceInput>
);

export const GroupInput = ({ validate, label, disabled, helperText, ...rest }) => (
  <ReferenceInput reference="Group" perPage={1000} sort={{ field: 'pair:label', order: 'ASC' }} {...rest}>
    <SelectInput
      optionText="pair:label"
      validate={validate}
      label={label}
      disabled={disabled}
      helperText={helperText}
      fullWidth
    />
  </ReferenceInput>
);
