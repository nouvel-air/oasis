import React from 'react';
import { useParams } from 'react-router-dom';
import { RecordContextProvider, useShowController, useRedirect, TextField } from 'react-admin';
import { ReferenceField } from '@semapps/field-components';
import { Container } from '@mui/material';
import Header from './Header';
import Footer from '../Footer';

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
      <Container maxWidth="md">
        <ReferenceField reference="Region" source="cdlt:hasRegion">
          <TextField source="pair:label" variant="h5" color="primary.main" component="div" />
        </ReferenceField>
        <TextField source="pair:label" variant="h1" />
      </Container>
      <Footer />
    </RecordContextProvider> 
  );
};

export default DetailsPage;