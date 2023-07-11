import React from 'react';
import { useParams } from 'react-router-dom';
import { RecordContextProvider, useShowController, useRedirect, TextField, UrlField, Link } from 'react-admin';
import { MarkdownField } from '@semapps/markdown-components';
import { ReferenceField, ReferenceArrayField } from '@semapps/field-components';
import { Container, Grid, Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import LockIcon from '@mui/icons-material/Lock';
import Header from './Header';
import Footer from '../Footer';
import Separator from '../Separator';
import ServiceIcons from './ServiceIcons';
import ContactButton from './ContactButton';
import Pictures from './Pictures';
import ServicesList from './ServicesList';
import ShareButtons from './ShareButtons';
import MapField from '../../common/field/MapField/MapField';
import backgroundBottomImage from '../../assets/background-bottom.png'
import backgroundTopImage from '../../assets/background-top.png'
import ScrollToTop from '../ScrollToTop';

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
      <ScrollToTop />
      <Header />
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={8}>
            <ReferenceField reference="Region" source="cdlt:hasRegion">
            <TextField source="pair:label" variant="h4" color="primary.main" component="div" />
            </ReferenceField>
            <TextField source="pair:label" variant="h1" />
            <Separator mt={2} mb={2}/>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" flexDirection="column" alignItems="flex-end">
              <ServiceIcons source="cdlt:hasServiceType" />
              <ContactButton />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <WhitePinkWrapper>
        <Container maxWidth="md">
          <Pictures />
          <Grid container spacing={2} mt={2} mb={2}>
            <Grid item xs={8}>
              <Typography variant="body1" sx={{ color: '#6F7B7C', mb: 2 }}>
                <MarkdownField source="pair:description" forceInline />
              </Typography>
              <UrlField source="pair:homePage" variant="h6" target="_blank" />
              <Separator mt={4} mb={3} />
            </Grid>
            <Grid item xs={4}>
              <Box display="flex" flexDirection="column" alignItems="flex-end">
                <ShareButtons />
                <Link to={`/lieux/${slug}/editer`}>
                  <Button endIcon={<LockIcon color="primary" />} color="secondary" sx={{ mt: 4 }}>Editer la page</Button>
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Typography variant="h3" mb={4}>Les formules</Typography>
          <ReferenceArrayField source="pair:offers" reference="Service">
            <ServicesList />
          </ReferenceArrayField>
          <Separator mt={6} />
        </Container>
      </WhitePinkWrapper>
      <GreyPinkWrapper>
        <Container maxWidth="md" sx={{ pt: 3 }}>
          <Typography variant="h3" mt={1} mb={3}>Localisation</Typography>
          <MapField 
            address={record => record?.['pair:hasPostalAddress']?.['pair:label']} 
            latitude={record => record?.['pair:hasPostalAddress']?.['pair:latitude']} 
            longitude={record => record?.['pair:hasPostalAddress']?.['pair:longitude']} 
            typographyProps={{ variant: 'body1', color: 'secondary', mb: 3 }}
            scrollWheelZoom={false}
          />
        </Container>
      </GreyPinkWrapper>
      <Footer />
    </RecordContextProvider> 
  );
};

const WhitePinkWrapper = styled(Box)({
  backgroundImage: `url(${backgroundTopImage})`, 
  backgroundRepeat: 'repeat-x', 
  backgroundPosition: 'top', 
  backgroundSize: '2px', 
  backgroundColor: '#F6F6F6'
});

const GreyPinkWrapper = styled(Box)({
  backgroundImage: `url(${backgroundBottomImage})`, 
  backgroundRepeat: 'repeat-x', 
  backgroundPosition: 'top', 
  backgroundSize: '2px', 
  backgroundColor: '#FF96A0'
});

export default DetailsPage;