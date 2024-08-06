import React from 'react';
import { ImageField } from 'react-admin';
import { ImageInput as SemAppsImageInput } from '@semapps/input-components';
import { grey } from '@mui/material/colors';
import { arrayOf } from '../../utils';

export const numFiles = (min, max) => value => {
  const files = arrayOf(value);
  if (files.length < min) {
    return `Minimum ${min} images requises`;
  } else if (files.length > max) {
    return `Maximum ${max} images autorisées`;
  } else {
    return undefined;
  }
};

const ImageInput = props => (
  <SemAppsImageInput
    accept="image/png, image/jpeg, image/gif"
    maxSize={2000000}
    placeholder="Déposez les images à uploader, ou cliquez pour en sélectionner (taille maximale: 2Mb)"
    sx={{
      '& .RaFileInput-dropZone': {
        bgcolor: grey[200],
        borderColor: grey[400],
        borderWidth: 1,
        borderStyle: 'solid',
        textAlign: 'left',
        paddingLeft: '12px',
        color: grey[600],
        padding: '14px'
      }
    }}
    multiple
    options={{}}
    {...props}
  >
    <ImageField source="src" />
  </SemAppsImageInput>
);

export default ImageInput;
