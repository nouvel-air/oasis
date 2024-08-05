import React from 'react';
import { extractContext, LocationInput as SemAppsLocationInput } from '@semapps/geo-components';

// For places, we do not receive a ZIP code because places can have many ZIP codes
// So find the department short code (eg FR-60) and transform it to 60000 so that we have at least the correct department code
const extractZipCodeFromPlaceContext = context => {
  const property = context.find(property => property.id.startsWith(`region.`));
  if (property) return property.short_code?.slice(-2);
};

const LocationInput = props => (
  <SemAppsLocationInput
    mapboxConfig={{
      access_token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      types: ['place', 'address'],
      country: ['fr', 'be', 'ch', 'gp', 'mq', 're', 'pf', 'nc', 'gf', 'wf']
    }}
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
    {...props}
  />
);

export default LocationInput;
