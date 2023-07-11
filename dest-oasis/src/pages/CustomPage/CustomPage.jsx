import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecordContextProvider, useShowController, useRedirect, TextField, UrlField, Link } from 'react-admin';
import { Container, Grid, Box, Typography, Button } from '@mui/material';
import { MarkdownField } from '@semapps/markdown-components';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import ScrollToTop from '../../layout/ScrollToTop';

const CustomPage = () => {
  const { slug } = useParams();
  const redirect = useRedirect();
  
  const { record } = useShowController({ 
    resource: 'Page',
    id: import.meta.env.VITE_APP_MIDDLEWARE_URL + 'pages/' + slug, 
    queryOptions: { onError: () => redirect('/') }
  });

  if (!record) return null;

  return (
    <RecordContextProvider value={record}>
      <ScrollToTop />
      <Header />
      <Container maxWidth="md" sx={{ mt: 3, mb: 10 }}>
        {/* <Typo source="semapps:title" variant="h4" color="primary.main" component="div" /> */}
        <TextField source="semapps:title" variant="h1" />
        <MarkdownField source="semapps:content" />
      </Container>
      <Footer />
    </RecordContextProvider>
  )
};

export default CustomPage;
