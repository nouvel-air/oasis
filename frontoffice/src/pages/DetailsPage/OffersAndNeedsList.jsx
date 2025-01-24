import React, { useState, useEffect, useMemo } from 'react';
import { useListContext, TextField, RecordContextProvider, Loading } from 'react-admin';
import { Stack, Card, CardMedia, CardContent, Button, useMediaQuery, Box } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ServiceTypeField from './ServiceTypeField';
import { arrayOf, hasType } from '../../utils';

const OffersAndNeedsList = ({ Header }) => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'), { noSsr: true });
  const sm = useMediaQuery(theme => theme.breakpoints.down('md'), { noSsr: true });
  const [externalLinks, setExternalLinks] = useState({});
  const { data } = useListContext();

  // We receive all objects that the place offers, including hosting offers, so we must filter that out
  // We cannot use the filter prop of ReferenceArrayField because it only supports a single value
  const filteredData = useMemo(
    () => data.filter(record => hasType(record, 'cdlt:OfferAndNeed') || hasType(record, 'pair:Event')),
    [data]
  );

  useEffect(() => {
    (async () => {
      if (filteredData) {
        let externalLinks = [];
        for (const record of filteredData) {
          const wordpressUri = arrayOf(record['cdlt:exportedTo']).find(uri =>
            uri.startsWith('https://cooperative-oasis.org')
          );
          if (wordpressUri) {
            try {
              const response = await fetch(wordpressUri, { headers: { Accept: 'application/json' } });
              if (response.ok) {
                const json = await response.json();
                externalLinks[record.id] = json.link;
              }
            } catch (e) {
              // Ignore fetch fails
            }
          }
        }
        setExternalLinks(externalLinks);
      }
    })();
  }, [filteredData, setExternalLinks]);

  if (!filteredData) return null;

  console.log('external links', filteredData > 0 && Object.values(externalLinks).length === 0);

  return (
    <>
      <Header />
      <Stack spacing={3}>
        {filteredData.length > 0 && Object.values(externalLinks).length === 0 && (
          <Box sx={{ width: '100%', height: 300 }}>
            <Loading loadingSecondary="" sx={{ color: 'primary' }} />
          </Box>
        )}
        {filteredData
          .filter(record => externalLinks[record.id])
          .map(record => (
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
                  <TextField
                    source="pair:description"
                    variant="subtitle1"
                    component="div"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '3',
                      WebkitBoxOrient: 'vertical'
                    }}
                  />
                  <Button
                    startIcon={<AddCircleIcon />}
                    sx={{ mt: 2, pr: 4 }}
                    onClick={() => window.open(externalLinks[record.id], '_blank')}
                  >
                    En savoir plus
                  </Button>
                </CardContent>
              </Card>
            </RecordContextProvider>
          ))}
      </Stack>
    </>
  );
};

export default OffersAndNeedsList;
