import React from 'react';
import { ListBase, TextField, useListContext, RecordContextProvider, Loading, Link } from 'react-admin';
import { Box, Container, Card, Grid, Button, CardContent, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ServiceIcons from './ServiceIcons';
import Hero from './Hero';
import Footer from '../../layout/Footer';
import ScrollToTop from '../../layout/ScrollToTop';
import DepartmentField from '../../common/field/DepartmentField';

const getSlugFromUri = str => str.match(new RegExp(`.*/(.*)`))[1];

const CardsList = () => {
  const { data, isFetching, setFilters } = useListContext();
  return (
    <Grid container spacing={2} sx={{ position: 'relative' }}>
      {data && data.map(record => (
        <RecordContextProvider key={record.id} value={record}>
          <Grid item xs={12} sm={6} md={4}>
            <Link to={`/lieux/${encodeURIComponent(getSlugFromUri(record.id))}`}>
              <Card variant="outlined" sx={{ borderWidth: 0 }}>
                <CardMedia
                  sx={{ height: 250, position: 'relative', backgroundColor: '#F6F6F6' }}
                  image={Array.isArray(record['pair:depictedBy']) ? record['pair:depictedBy'][0] : record['pair:depictedBy']}
                  title={record['pair:label']}
                >
                  <IconsContainer>
                    <ServiceIcons source="cdlt:hasServiceType" />
                  </IconsContainer>
                </CardMedia>
                <CardContent sx={{ padding: 3}}>
                  <TextField source="pair:label" gutterBottom variant="h4" component="div" />
                  <Typography variant="h6" component="div">
                    <DepartmentField source="pair:hasPostalAddress.pair:addressZipCode" />
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        </RecordContextProvider>
      ))}
      {isFetching && 
        (data && data.length > 0 ?
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'white', opacity: 0.5, minHeight: 250 }}>
          <Loading loadingSecondary='' />
        </Box>
        :
        <Box sx={{ width: '100%', height: 300 }}>
          <Loading loadingSecondary='' />
        </Box>
      )}
      {!isFetching && data && data.length === 0 && 
        <Box display="flex" flexDirection="column" alignItems="center" justifyItems="center" sx={{ width: '100%', height: 300, p: 5 }}>
          <Typography variant="h3" pb={1}>Aucun résultat</Typography>
          <Button onClick={() => setFilters({})}>
            Réinitialiser les filtres
          </Button>
        </Box>
      }
    </Grid>
  );
}

const HomePage = () => {
  return (
    <Box sx={{ backgroundColor: '#F6F6F6' }}>
      <ListBase resource="Place">
        <ScrollToTop />
        <Hero />
        <Container sx={{ mt: 1, mb: 6 }}>
          <CardsList />
        </Container>
        <Footer />
      </ListBase> 
    </Box>
  );
};

const IconsContainer = styled('div')({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  color: 'darkslategray',
  backgroundColor: '#FF96A0BB',
  padding: 10,
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center'
});

export default HomePage;