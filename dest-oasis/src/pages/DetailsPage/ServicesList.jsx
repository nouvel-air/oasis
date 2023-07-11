import React from 'react';
import { useListContext, TextField, RecordContextProvider } from 'react-admin';
import { Stack, Card, CardMedia, CardContent, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ServiceTypeField from './ServiceTypeField';

const ServicesList = () => {
  const { data } = useListContext();
  return (
    <Stack spacing={3}>
      {data && data.map(record => (
        <RecordContextProvider value={record}>
          <Card variant="outlined" sx={{ borderWidth: 0, display: 'flex' }}>
            <CardMedia
              component="img"
              sx={{ width: '50%', height: 215 }}
              image={record['pair:depictedBy']}
              alt={record['pair:label']}
            />
            <CardContent sx={{ flex: '1 0', padding: 4, position: 'relative' }}>
              <ServiceTypeField source="cdlt:hasServiceType" />
              <TextField source="pair:label" variant="h5" component="div" mb={3} />
              <TextField source="cdlt:capacity" variant="subtitle1" component="div" />
              <TextField source="cdlt:price" variant="subtitle1" component="div" mb={1} />
              <Button startIcon={<AddCircleIcon />} sx={{ pr: 4 }}>En savoir plus</Button>
              <Button startIcon={<CalendarMonthIcon />}>Réserver</Button>
            </CardContent>
          </Card>
        </RecordContextProvider>
      ))}
    </Stack>
  );
};

export default ServicesList;
