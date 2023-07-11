import React, { useState, useCallback } from 'react';
import { useListContext, TextField, RecordContextProvider } from 'react-admin';
import { Stack, Card, CardMedia, CardContent, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import ServiceTypeField from './ServiceTypeField';
import DescriptionDialog from './DescriptionDialog';

const ServicesList = ({ contact }) => {
  const [open, setOpen] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [index, setIndex] = useState(false);
  const { data } = useListContext();

  const showPicture = useCallback((index) => {
    setIndex(index);
    setOpenImage(true);
  }, [setOpenImage, setIndex]);

  return (
    <>
      <Stack spacing={3}>
        {data && data.map((record, i) => (
          <RecordContextProvider value={record} key={record.id}>
            <Card variant="outlined" sx={{ borderWidth: 0, display: 'flex' }}>
              <CardMedia
                component="img"
                sx={{ width: '50%', height: 215 }}
                image={record['pair:depictedBy']}
                alt={record['pair:label']}
                onClick={() => showPicture(i)}
              />
              <CardContent sx={{ flex: '1 0', padding: 4, position: 'relative' }}>
                <ServiceTypeField source="cdlt:hasServiceType" />
                <TextField source="pair:label" variant="h5" component="div" mb={3} />
                <TextField source="cdlt:capacity" variant="subtitle1" component="div" />
                <TextField source="cdlt:price" variant="subtitle1" component="div" mb={1} />
                {record['pair:description'] && 
                  <Button startIcon={<AddCircleIcon />} sx={{ pr: 4 }} onClick={() => setOpen(record.id)}>En savoir plus</Button>
                }
                {record['cdlt:registrationLink'] 
                  ? <a href={record['cdlt:registrationLink']} target="_blank"><Button startIcon={<CalendarMonthIcon />}>Réserver</Button></a>
                  : <Button startIcon={<CalendarMonthIcon />} onClick={() => contact(record)}>Réserver</Button>
                }
              </CardContent>
              <DescriptionDialog open={open === record.id} onClose={() => setOpen(false)} />
            </Card>
          </RecordContextProvider>
        ))}
      </Stack>
      <Lightbox
        plugins={[Captions]}
        styles={{ captionsTitle: { fontFamily: 'Geomanist' }}}
        open={openImage}
        index={index}
        close={() => setOpenImage(false)}
        slides={data && data.map(record => ({ 
          src: record['pair:depictedBy'],
          title: record['pair:label']
        }))}
      />
    </>
  );
};

export default ServicesList;
