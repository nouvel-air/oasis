import React from 'react';
import { TextInput, ImageField, email, required } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import { ImageInput } from '@semapps/input-components';
import { extractContext, LocationInput } from '@semapps/geo-components';
import { StatusInput, UsersInput } from '../../common/input';
import useAccountType from '../../hooks/useAccountType';

// For places, we do not receive a ZIP code because places can have many ZIP codes
// So find the department short code (eg FR-60) and transform it to 60000 so that we have at least the correct department code
const extractZipCodeFromPlaceContext = context => {
  const property = context.find(property => property.id.startsWith(`region.`));
  if (property) return property.short_code?.slice(-2);
};

const PlaceForm = () => {
  const accountType = useAccountType();
  return (
    <>
      <TextInput source="pair:label" fullWidth validate={[required()]} />
      <MarkdownInput source="pair:description" fullWidth validate={[required()]} isRequired />
      <ImageInput source="pair:depictedBy" accept="image/*" multiple>
        <ImageField source="src" />
      </ImageInput>
      <LocationInput
        mapboxConfig={{
          access_token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
          types: ['place', 'address'],
          country: ['fr', 'be', 'ch']
        }}
        source="pair:hasPostalAddress"
        parse={value => {
          const countryName = extractContext(value.context, 'country');
          const placeType = value.place_type[0];
          return {
            type: 'pair:PostalAddress',
            'pair:label': value.place_name,
            'pair:addressLocality':
              placeType === 'place'
                ? value.text
                : placeType === 'address'
                ? extractContext(value.context, 'place')
                : undefined,
            'pair:addressStreet': placeType === 'address' ? [value.address, value.text].join(' ') : undefined,
            'pair:addressZipCode':
              placeType === 'place'
                ? extractZipCodeFromPlaceContext(value.context)
                : extractContext(value.context, 'postcode'),
            'pair:addressCountry': countryName,
            'pair:longitude': value.center[0],
            'pair:latitude': value.center[1]
          };
        }}
        optionText={resource => resource['pair:label']}
        validate={[required()]}
        fullWidth
      />
      <TextInput source="pair:homePage" fullWidth />
      <TextInput source="pair:e-mail" fullWidth validate={[required(), email()]} />
      {accountType === 'admin' && <UsersInput source="pair:affiliates" fullWidth />}
      <StatusInput
        source="cdlt:hasPublicationStatus"
        filter={{ a: 'cdlt:PublicationStatus' }}
        validate={[required()]}
      />
    </>
  );
};

export default PlaceForm;
