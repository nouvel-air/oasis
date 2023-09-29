import React from 'react';
import { useParams } from 'react-router-dom';
import { RecordContextProvider, useShowController, useRedirect, TextField } from 'react-admin';
import { Container } from '@mui/material';
import { MarkdownField } from '@semapps/markdown-components';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import ScrollToTop from '../../layout/ScrollToTop';
import usePageTracking from '../../hooks/usePageTracking';

const CustomPage = () => {
  const { slug } = useParams();
  const redirect = useRedirect();
  
  const { record } = useShowController({ 
    resource: 'Page',
    id: process.env.REACT_APP_MIDDLEWARE_URL + 'pages/' + slug, 
    queryOptions: { onError: () => redirect('/') }
  });

  usePageTracking(record?.['semapps:title']);

  if (!record) return null;

  return (
    <RecordContextProvider value={record}>
      <ScrollToTop />
      <Header />
      <Container maxWidth="md" sx={{ mt: 3, mb: 10 }}>
        {/* <Typo source="semapps:title" variant="h4" color="primary.main" component="div" /> */}
        <TextField source="semapps:title" variant="h1" component="h1" />
        <MarkdownField source="semapps:content" />
      </Container>
      <Footer />
    </RecordContextProvider>
  )
};

export default CustomPage;
