import React from 'react';
import { ListBase, TextField, useListContext, RecordContextProvider } from 'react-admin';
import { Container, Card, Grid, CardContent, CardMedia } from '@mui/material';
import { ReferenceField } from '@semapps/field-components';
import { styled } from '@mui/material/styles';
import ServiceIcons from './ServiceIcons';
import Hero from './Hero';

const IconsContainer = styled('div')({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  color: 'darkslategray',
  backgroundColor: '#FF96A0BB',
  padding: 8,
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center'
});

const CardsList = () => {
  const { data } = useListContext();
  console.log('data', data);
  return (
    <Grid container spacing={2}>
      {data && data.map(record => (
        <RecordContextProvider key={record.id} value={record}>
          <Grid item xs={4}>
            <Card variant="outlined">
              <CardMedia
                sx={{ height: 140, position: 'relative' }}
                image={Array.isArray(record['pair:depictedBy']) ? record['pair:depictedBy'][0] : record['pair:depictedBy']}
                title={record['pair:label']}
              >
                <IconsContainer>
                  <ServiceIcons source="cdlt:hasServiceType" />
                </IconsContainer>
              </CardMedia>
              <CardContent>
                <TextField source="pair:label" gutterBottom variant="h5" component="div" />
                <ReferenceField reference="Region" source="cdlt:hasRegion">
                  <TextField source="pair:label" variant="h6" component="div" />
                </ReferenceField>
              </CardContent>
            </Card>
          </Grid>
        </RecordContextProvider>
      ))}
    </Grid>
  );
}

const HomePage = () => {
  return (
    <>
      <Hero />
      <Container>
        <ListBase resource="Place">
          <CardsList />
        </ListBase> 
      </Container>
    </>
  );
};

export default HomePage;