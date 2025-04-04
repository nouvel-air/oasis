import React from 'react';
import { SimpleList, Datagrid, TextField, EditButton, useGetIdentity } from 'react-admin';
import { ListWithPermissions } from '@semapps/auth-provider';
import { ReferenceField } from '@semapps/field-components';
import { useMediaQuery } from '@mui/material';
import useAccountType from '../../hooks/useAccountType';
import { arrayOf } from '../../utils';
import { offeredByFilter } from '../../queries';
import OfferAndNeedSidebar from './OfferAndNeedSidebar';

const OfferAndNeedList = props => {
  const { identity } = useGetIdentity();
  const accountType = useAccountType();
  const offeredByUris = [...arrayOf(identity?.webIdData?.['pair:affiliatedBy']), identity?.id];
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'));
  if (!identity?.id) return;
  return (
    <ListWithPermissions
      filter={accountType === 'admin' ? {} : { sparqlWhere: offeredByFilter(offeredByUris) }}
      aside={<OfferAndNeedSidebar />}
      perPage={25}
      {...props}
    >
      {xs ? (
        <SimpleList
          primaryText="%{pair:label}"
          secondaryText={
            <ReferenceField source="pair:offeredBy" reference="Place" link={false}>
              <TextField source="pair:label" />
            </ReferenceField>
          }
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="pair:label" />
          <ReferenceField source="pair:hasType" reference="Type" link={false}>
            <TextField source="pair:label" />
          </ReferenceField>
          <ReferenceField source="pair:offeredBy" reference="Place" link={false}>
            <TextField source="pair:label" />
          </ReferenceField>
          <ReferenceField source="cdlt:hasPublicationStatus" reference="Status" link={false}>
            <TextField source="pair:label" />
          </ReferenceField>
          <EditButton />
        </Datagrid>
      )}
    </ListWithPermissions>
  );
};

export default OfferAndNeedList;
