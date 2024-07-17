import React from 'react';
import { SimpleList, Datagrid, TextField, EditButton, useGetIdentity } from 'react-admin';
import { ReferenceField } from '@semapps/field-components';
import { ListWithPermissions } from '@semapps/auth-provider';
import { useMediaQuery } from '@mui/material';
import useIsAdmin from '../../hooks/useIsAdmin';

const OrganizationList = props => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const isAdmin = useIsAdmin();
  const { identity } = useGetIdentity();
  return (
    <ListWithPermissions filter={isAdmin ? {} : { 'pair:affiliates': identity?.id }} perPage={25} {...props}>
      {xs ? (
        <SimpleList
          primaryText="%{pair:label}"
          secondaryText={
            <ReferenceField source="pair:partOf" reference="Group" link={false}>
              <TextField source="pair:label" />
            </ReferenceField>
          }
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="pair:label" />
          <ReferenceField source="pair:partOf" reference="Group" link={false}>
            <TextField source="pair:label" />
          </ReferenceField>
          <TextField source="pair:e-mail" />
          <EditButton />
        </Datagrid>
      )}
    </ListWithPermissions>
  );
};

export default OrganizationList;
