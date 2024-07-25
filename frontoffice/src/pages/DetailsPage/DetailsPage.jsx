import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecordContextProvider, useShowController, useRedirect, TextField, UrlField } from 'react-admin';
import { MarkdownField } from '@semapps/markdown-components';
import { ReferenceArrayField } from '@semapps/field-components';
import { Container, Grid, Box, Typography, Button, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import LockIcon from '@mui/icons-material/Lock';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Separator from '../Separator';
import ServiceIcons from './ServiceIcons';
import ContactButton from './ContactButton';
import Pictures from './Pictures';
import ServicesList from './ServicesList';
import ShareButtons from './ShareButtons';
import MapField from '../../common/field/MapField/MapField';
import backgroundBottomImage from '../../assets/background-bottom.png'
import backgroundTopImage from '../../assets/background-top.png'
import ScrollToTop from '../../layout/ScrollToTop';
import ContactDialog from './ContactDialog';
import DepartmentField from '../../common/field/DepartmentField';
import OffersAndNeedsList from './OffersAndNeedsList';

const OffersAndNeedsHeader = () => (
  <>
    <Separator mt={6} mb={3} />
    <Typography variant="h3" mb={4}>Petites annonces</Typography>
  </>
);

const DetailsPage = () => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'), { noSsr: true });
  const [openContact, setOpenContact] = useState(false);
  const [service, setService] = useState();
  const { slug } = useParams();
  const redirect = useRedirect();
  
  const { record } = useShowController({ 
    resource: 'Place',
    id: process.env.REACT_APP_MIDDLEWARE_URL + 'places/' + slug, 
    queryOptions: { onError: () => redirect('/') }
  });

  const contact = service => {
    setService(service);
    setOpenContact(true);
  };

  if (!record) return null;

  return (
    <RecordContextProvider value={record}>
      <ScrollToTop />
      <Header />
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" color="primary.main" component="div">
              <DepartmentField source="pair:hasPostalAddress.pair:addressZipCode" />
            </Typography>
            <TextField source="pair:label" variant="h1" component="h1" />
            <Separator mt={xs ? 1 : 2} mb={2} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box display="flex" flexDirection="column" alignItems={xs ? 'flex-start' : 'flex-end'}>
              <ServiceIcons source="cdlt:hasServiceType" />
              {!xs && <ContactButton onClick={() => contact()} sx={{ mt: 4 }} />}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <WhitePinkWrapper>
        <Container maxWidth="md">
          <Pictures />
          <Grid container spacing={2} mt={2} mb={2}>
            <Grid item xs={12} md={8}>
              <Typography variant="body1" sx={{ color: '#6F7B7C', mt: -2, mb: 2 }}>
                <MarkdownField source="pair:description" />
              </Typography>
              <UrlField source="pair:homePage" variant="h6" target="_blank" />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex" flexDirection="column" alignItems={xs ? 'flex-start' : 'flex-end'}>
                {xs && <ContactButton onClick={() => contact()} sx={{ mb: 2 }} />}
                <ShareButtons />
                <a href={`${process.env.REACT_APP_BACKOFFICE_URL}Place/${encodeURIComponent(record.id)}`} target="_blank" rel="noopener noreferrer">
                  <Button endIcon={<LockIcon color="primary" />} color="secondary" sx={{ mt: xs ? 2 : 4 }}>Editer la page</Button>
                </a>
              </Box>
            </Grid>
          </Grid>
          <Separator mt={4} mb={3} />
          <Typography variant="h3" mb={4}>Les formules</Typography>
          <ReferenceArrayField source="pair:offers" reference="Service" filter={{ type: 'cdlt:HostingService' }}>
            <ServicesList contact={contact} />
          </ReferenceArrayField>
          <ReferenceArrayField source="pair:offers" reference="OfferAndNeed" filter={{ type: 'cdlt:OfferAndNeed' }}>
            <OffersAndNeedsList Header={OffersAndNeedsHeader} />
          </ReferenceArrayField>
          <Separator mt={6} />
        </Container>
      </WhitePinkWrapper>
      <GreyPinkWrapper>
        <Container maxWidth="md" sx={{ pt: 2 }}>
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
      <ContactDialog open={!!openContact} onClose={() => setOpenContact()} service={service} />
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