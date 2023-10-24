import React from 'react';
import { Container, Box, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoIcon } from '../assets/logo-blanc.svg';

const Footer = () => (
  <Box bgcolor="primary.main" padding={{ xs: '30px 0px', sm: 12 }} className="footer">
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <LogoIcon />
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography fontSize={14} color="white">
            La Coopérative Oasis anime le réseau français des écolieux. Elle accompagne chaque année la création de dizaines de 
            nouveaux projets en France et soutient l'émergence de modes de vie plus collectifs et écologiques. Avec Destination 
            Oasis, nous souhaitons mettre en avant des oasis qui proposent des offres d'écotourisme et les aider à s'affranchir 
            des plateformes habituelles.
          </Typography>
          <br />
          <Typography fontSize={14} color="white">
            <Link to="/pages/mentions-legales" style={{ color: 'white' }}>Mentions légales</Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default Footer;
