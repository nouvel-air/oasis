import React from 'react';
import { useParams } from 'react-router-dom';
import { RecordContextProvider, useShowController, useRedirect, TextField } from 'react-admin';
import { ReferenceField } from '@semapps/field-components';
import { Container, Grid, Box } from '@mui/material';
import Header from './Header';
import Footer from '../Footer';
import Separator from '../Separator';
import ServiceIcons from './ServiceIcons';
import ContactButton from './ContactButton';
import Pictures from './Pictures';

const DetailsPage = () => {
  const { slug } = useParams();
  const redirect = useRedirect();
  const { record } = useShowController({ 
    resource: 'Place',
    id: import.meta.env.VITE_APP_MIDDLEWARE_URL + 'places/' + slug, 
    queryOptions: { onError: () => redirect('/') }
  });
  if (!record) return null;

  return (
    <RecordContextProvider value={record}>
      <Header />
      <Container maxWidth="md" sx={{ position: 'relative', mt: 4, mb: 4 }}>
        <Grid container>
          <Grid item xs={8}>
            <ReferenceField reference="Region" source="cdlt:hasRegion">
            <TextField source="pair:label" variant="h5" color="primary.main" component="div" />
            </ReferenceField>
            <TextField source="pair:label" variant="h1" />
            <Separator mt={2} />
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" flexDirection="column" alignItems="flex-end">
              <ServiceIcons source="cdlt:hasServiceType" />
              <ContactButton />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="md">
        <Pictures />
      </Container>
      <Footer />
    </RecordContextProvider> 
  );
};

export default DetailsPage;