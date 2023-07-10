import React from 'react';
import { useParams } from 'react-router-dom';
import { RecordContextProvider, useShowController, useRedirect, TextField, UrlField } from 'react-admin';
import { MarkdownField } from '@semapps/markdown-components';
import { ReferenceField, ReferenceArrayField } from '@semapps/field-components';
import { Container, Grid, Box, Typography } from '@mui/material';
import Header from './Header';
import Footer from '../Footer';
import Separator from '../Separator';
import ServiceIcons from './ServiceIcons';
import ContactButton from './ContactButton';
import Pictures from './Pictures';
import ServicesList from './ServicesList';

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
            <TextField source="pair:label" variant="h4" color="primary.main" component="div" />
            </ReferenceField>
            <TextField source="pair:label" variant="h1" />
            <Separator mt={2} mb={4}/>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" flexDirection="column" alignItems="flex-end">
              <ServiceIcons source="cdlt:hasServiceType" />
              <ContactButton />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box bgcolor="#F6F6F6" position="relative" mt="100px">
        <Container maxWidth="md" sx={{ position: 'relative', top: -100 }}>
          <Pictures />
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="body1" sx={{ color: '#6F7B7C', mt: 2, mb: 2 }}>
                <MarkdownField source="pair:description" forceInline />
              </Typography>
              <UrlField source="pair:homePage" variant="h6" />
              <Separator mt={4} mb={4} />
            </Grid>
          </Grid>
          <Typography variant="h3" mt={1} mb={4}>Les formules</Typography>
          <ReferenceArrayField source="pair:offers" reference="Service">
            <ServicesList />
          </ReferenceArrayField>
        </Container>
      </Box>
      <Footer />
    </RecordContextProvider> 
  );
};

export default DetailsPage;