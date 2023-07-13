import React from 'react';
import { TextInput, ImageField, email, required } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import { ImageInput } from '@semapps/input-components';
import { extractContext, LocationInput } from '@semapps/geo-components';
import { StatusInput, UsersInput } from '../../common/input';
import useIsAdmin from '../../hooks/useIsAdmin';

const PlaceForm = () => {
  const isAdmin = useIsAdmin();
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
          types: ['place', 'address', 'region'],
          country: ['fr', 'be', 'ch'],
        }}
        source="pair:hasPostalAddress"
        parse={(value) => {
          const countryName = extractContext(value.context, 'country');
          return ({
            type: 'pair:PostalAddress',
            'pair:label': value.place_name,
            'pair:addressLocality': value.place_type[0] === 'place' ? value.text : value.place_type[0] === 'address' ? extractContext(value.context, 'place') : undefined,
            'pair:addressStreet': value.place_type[0] === 'address' ? [value.address, value.text].join(' ') : undefined,
            'pair:addressZipCode': value.place_type[0] !== 'region' ? extractContext(value.context, 'postcode') : countryName === 'France' ? value.properties?.short_code?.substring(3) : undefined,
            'pair:addressCountry': countryName,
            'pair:longitude': value.center[0],
            'pair:latitude': value.center[1],
          })
        }}
        optionText={(resource) => resource['pair:label']}
        validate={[required()]}
        fullWidth
      />
      <TextInput source="pair:homePage" fullWidth />
      <TextInput source="pair:e-mail" fullWidth validate={[required(), email()]} />  
      {isAdmin && <UsersInput source="cdlt:proposedBy" fullWidth />}
      <StatusInput source="cdlt:hasPublicationStatus" validate={[required()]} />
    </>
  );
};

export default PlaceForm;
