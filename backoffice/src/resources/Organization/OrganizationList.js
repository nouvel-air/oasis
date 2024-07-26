import React from 'react';
import { SimpleList, Datagrid, TextField, EditButton, useGetIdentity, List } from 'react-admin';
import { ReferenceField } from '@semapps/field-components';
import { useMediaQuery } from '@mui/material';
import useAccountType from '../../hooks/useAccountType';

const OrganizationList = props => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const accountType = useAccountType();
  const { identity } = useGetIdentity();
  if (!identity?.id) return null;
  return (
    <List filter={accountType === 'admin' ? {} : { 'pair:affiliates': identity?.id }} perPage={25} {...props}>
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
    </List>
  );
};

export default OrganizationList;
