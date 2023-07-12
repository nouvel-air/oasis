import React from 'react';
import { Link } from 'react-router-dom';
import { ListBase, TextField, useListContext, RecordContextProvider } from 'react-admin';
import { Container, Card, Grid, CardContent, CardMedia } from '@mui/material';
import { ReferenceField } from '@semapps/field-components';
import { styled } from '@mui/material/styles';
import ServiceIcons from './ServiceIcons';
import Hero from './Hero';
import Footer from '../../layout/Footer';
import ScrollToTop from '../../layout/ScrollToTop';

const getSlugFromUri = str => str.match(new RegExp(`.*/(.*)`))[1];

const CardsList = () => {
  const { data } = useListContext();
  return (
    <Grid container spacing={2}>
      {data && data.map(record => (
        <RecordContextProvider key={record.id} value={record}>
          <Grid item xs={12} md={4}>
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
                  <ReferenceField reference="Region" source="cdlt:hasRegion">
                    <TextField source="pair:label" variant="h6" component="div" />
                  </ReferenceField>
                </CardContent>
              </Card>
              </Link>
            </Grid>
        </RecordContextProvider>
      ))}
    </Grid>
  );
}

const HomePage = () => {
  return (
    <ListBase resource="Place">
      <ScrollToTop />
      <Hero />
      <Container sx={{ mt: 1, mb: 6 }}>
        <CardsList />
      </Container>
      <Footer />
    </ListBase> 
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