import * as React from 'react';
import { Button, CardContent, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

const PreSignupForm = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const select = type => {
    searchParams.append('type', type);
    setSearchParams(searchParams);
  };

  return (
    <CardContent sx={{ pt: 0 }}>
      <Typography variant="body1" sx={{ pb: 2 }}>
        Veuillez choisir votre situation ci-dessous. Poster une annonce est gratuit pour les sociétaires de la
        Coopérative Oasis. Si vous cherchez à vendre un bien immobilier, une contribution financière vous sera demandée.
      </Typography>
      <Button onClick={() => select('societaire')} variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
        Je suis sociétaire de la Coopérative Oasis
      </Button>
      <Button onClick={() => select('agent')} variant="contained" color="primary" fullWidth>
        Je cherche à vendre un bien immobilier
      </Button>
    </CardContent>
  );
};

export default PreSignupForm;
