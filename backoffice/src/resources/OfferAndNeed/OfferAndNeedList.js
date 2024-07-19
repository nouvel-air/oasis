import React from 'react';
import { SimpleList, Datagrid, TextField, EditButton, useGetIdentity } from 'react-admin';
import { ListWithPermissions } from '@semapps/auth-provider';
import { ReferenceField } from '@semapps/field-components';
import { useMediaQuery } from '@mui/material';

const OfferAndNeedList = props => {
  const { identity } = useGetIdentity();
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'));
  if (!identity?.id) return;
  return (
    <ListWithPermissions perPage={25} {...props}>
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
          <EditButton />
        </Datagrid>
      )}
    </ListWithPermissions>
  );
};

export default OfferAndNeedList;
