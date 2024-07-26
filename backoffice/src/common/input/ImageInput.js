import React from 'react';
import { ImageField } from 'react-admin';
import { ImageInput as SemAppsImageInput } from '@semapps/input-components';
import { grey } from '@mui/material/colors';

export const numFiles = (min, max) => value => {
  if (!value || typeof value === 'string' || value.length < min) {
    return `Mimum ${min} images requises`;
  } else if (value.length > max) {
    return `Maximum ${max} images autorisées`;
  } else {
    return undefined;
  }
};

const ImageInput = props => (
  <SemAppsImageInput
    accept="image/png, image/jpeg, image/gif"
    maxSize={2000000}
    sx={{
      '& .RaFileInput-dropZone': {
        bgcolor: grey[200],
        borderColor: grey[400],
        borderWidth: 1,
        borderStyle: 'solid',
        textAlign: 'left',
        paddingLeft: '12px',
        color: grey[600]
      }
    }}
    multiple
    {...props}
  >
    <ImageField source="src" />
  </SemAppsImageInput>
);

export default ImageInput;
