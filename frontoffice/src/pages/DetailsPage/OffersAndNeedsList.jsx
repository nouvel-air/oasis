import React, { useState, useEffect } from 'react';
import { useListContext, TextField, RecordContextProvider } from 'react-admin';
import { Stack, Card, CardMedia, CardContent, Button, useMediaQuery } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ServiceTypeField from './ServiceTypeField';

const OffersAndNeedsList = ({ Header }) => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'), { noSsr: true });
  const sm = useMediaQuery(theme => theme.breakpoints.down('md'), { noSsr: true });
  const [externalLinks, setExternalLinks] = useState({}); 
  const { data } = useListContext();

  useEffect(() => {
    (async () => {
      if (data) {
        let externalLinks = [];
        for (const record of data) {
          if (record['cdlt:exportedTo']) {
            try {
              const response = await fetch(record['cdlt:exportedTo'], { headers: { Accept: 'application/json' }});
              if (response.ok) {
                const json = await response.json();
                externalLinks[record.id] = json.link;
              }
            }
            catch(e) {
              // Ignore fetch fails
            }
          }
        }
        setExternalLinks(externalLinks);
      }
    })();
  }, [data, setExternalLinks]);

  if (!data || data.filter(record => externalLinks[record.id]).length === 0) return null;

  return (
    <>
      <Header />
      <Stack spacing={3}>
        {data && data.filter(record => externalLinks[record.id]).map(record => (
          <RecordContextProvider value={record} key={record.id}>
            <Card variant="outlined" sx={{ borderWidth: 0, display: xs ? 'block' : 'flex' }}>
              <CardMedia
                component="img"
                sx={{ width: xs ? undefined : sm ? '35%' : '50%', height: xs ? 150 : 230, cursor: 'pointer' }}
                image={record['pair:depictedBy']}
                alt={record['pair:label']}
                onClick={() => window.open(externalLinks[record.id], '_blank')}
              />
              <CardContent sx={{ flex: '1 0', padding: xs ? 2 : 4, position: 'relative' }}>
                <ServiceTypeField source="cdlt:hasServiceType" />
                <TextField source="pair:label" variant="h5" component="div" mb={2} />
                <TextField source="pair:description" variant="subtitle1" component="div" sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "3",
                  WebkitBoxOrient: "vertical",
                }} />
                <Button startIcon={<AddCircleIcon />} sx={{ mt: 2, pr: 4 }} onClick={() => window.open(externalLinks[record.id], '_blank')}>En savoir plus</Button>
              </CardContent>
            </Card>
          </RecordContextProvider>
        ))}
      </Stack>
    </>
  );
};

export default OffersAndNeedsList;
