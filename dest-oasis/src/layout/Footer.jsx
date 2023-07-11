import React from 'react';
import { Container, Box, Grid, Typography } from '@mui/material';
import { ReactComponent as LogoIcon } from '../assets/logo-blanc.svg';

const Footer = () => (
  <Box bgcolor="primary.main" padding={12}>
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <LogoIcon />
        </Grid>
        <Grid item xs={9}>
          <Typography fontSize={14} color="white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut bibendum vehicula placerat. Mauris molestie nunc quis augue 
            ultrices, at hendrerit est rhoncus. Mauris enim ante, luctus nec arcu sollicitudin, feugiat pulvinar lacus. Proin nec orci 
            ut mauris bibendum convallis aliquam interdum dolor. Vestibulum tincidunt quam sed lobortis accumsan. Ut id dapibus velit, 
            quis vestibulum erat. Praesent sit amet condimentum risus, nec pulvinar lorem. Suspendisse egestas risus eu turpis accumsan, 
            et venenatis lacus hendrerit.
          </Typography>      
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default Footer;
