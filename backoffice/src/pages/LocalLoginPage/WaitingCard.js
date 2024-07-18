import * as React from 'react';
import { CardContent, Typography } from '@mui/material';

const WaitingCard = ({ isAgent }) => (
  <CardContent sx={{ pt: 0 }}>
    <Typography variant="body1" sx={{ pb: 2 }}>
      {isAgent
        ? "Votre compte a été créé. Veuillez cliquer sur le lien envoyé par email pour l'activer."
        : "Votre compte a été créé et il est en cours de vérification. Vous serez notifié lorsqu'il sera activé. Pensez à cliquer sur le lien d'activation envoyé par email."}
    </Typography>
  </CardContent>
);

export default WaitingCard;
