import React, { useState } from 'react';
import { useListContext, TextField, RecordContextProvider } from 'react-admin';
import { Stack, Card, CardContent, Button, useMediaQuery } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ServiceTypeField from './ServiceTypeField';
import DescriptionDialog from './DescriptionDialog';
import ServicePictures from './ServicePictures';

const ServicesList = ({ contact }) => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'), { noSsr: true });
  const [open, setOpen] = useState(false);
  const { data } = useListContext();

  return (
    <>
      <Stack spacing={3}>
        {data &&
          data.map((record, i) => (
            <RecordContextProvider value={record} key={record.id}>
              <Card variant="outlined" sx={{ borderWidth: 0, display: xs ? 'block' : 'flex' }}>
                <ServicePictures />
                <CardContent sx={{ flex: '1 0', padding: xs ? 2 : 4, position: 'relative' }}>
                  <ServiceTypeField source="cdlt:hasServiceType" />
                  <TextField source="pair:label" variant="h5" component="div" mb={2} />
                  <TextField source="cdlt:capacity" variant="subtitle1" component="div" />
                  <TextField source="cdlt:price" variant="subtitle1" component="div" mb={1} />
                  {record['pair:description'] && (
                    <Button startIcon={<AddCircleIcon />} sx={{ pr: 4 }} onClick={() => setOpen(record.id)}>
                      En savoir plus
                    </Button>
                  )}
                  {record['cdlt:registrationLink'] ? (
                    <a href={record['cdlt:registrationLink']} target="_blank" rel="noopener noreferrer">
                      <Button startIcon={<CalendarMonthIcon />}>Réserver</Button>
                    </a>
                  ) : (
                    <Button startIcon={<CalendarMonthIcon />} onClick={() => contact(record)}>
                      Réserver
                    </Button>
                  )}
                </CardContent>
                <DescriptionDialog open={open === record.id} onClose={() => setOpen(false)} />
              </Card>
            </RecordContextProvider>
          ))}
      </Stack>
    </>
  );
};

export default ServicesList;
