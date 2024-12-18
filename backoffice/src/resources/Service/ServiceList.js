import React from 'react';
import { SimpleList, Datagrid, TextField, EditButton, useGetIdentity } from 'react-admin';
import { ReferenceField } from '@semapps/field-components';
import { ListWithPermissions } from '@semapps/auth-provider';
import { useMediaQuery } from '@mui/material';
import useAccountType from '../../hooks/useAccountType';
import { arrayOf } from '../../utils';
import { offeredByFilter } from '../../queries';

const ServiceList = props => {
  const accountType = useAccountType();
  const { identity } = useGetIdentity();
  const organizations = arrayOf(identity?.webIdData?.['pair:affiliatedBy']);
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'));
  if (!identity?.id) return;
  return (
    <ListWithPermissions
      filter={accountType === 'admin' ? {} : { sparqlWhere: offeredByFilter(organizations) }}
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
          <ReferenceField source="cdlt:hasServiceType" reference="Type" link={false}>
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

export default ServiceList;
