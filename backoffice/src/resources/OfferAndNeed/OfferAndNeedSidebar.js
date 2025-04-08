import React from 'react';
import { FilterLiveSearch } from 'react-admin';
import { ReferenceFilter } from '@semapps/list-components';
import { Card, CardContent } from '@mui/material';
import { filterNoParent } from '../../queries';

const OfferAndNeedSidebar = () => (
  <Card sx={{ ml: 2, mt: '64px' }}>
    <CardContent>
      <FilterLiveSearch source="q" label="Rechercher" fullWidth />
      <ReferenceFilter
        reference="Status"
        source="cdlt:hasPublicationStatus"
        limit={100}
        filter={{ a: 'cdlt:PublicationStatus' }}
        sort={{ field: 'pair:label', order: 'DESC' }}
      />
      <ReferenceFilter
        reference="Type"
        source="pair:hasType"
        limit={100}
        filter={{ a: 'cdlt:OfferAndNeedType', sparqlWhere: filterNoParent }}
        sort={{ field: 'pair:label', order: 'DESC' }}
      />
    </CardContent>
  </Card>
);

export default OfferAndNeedSidebar;
