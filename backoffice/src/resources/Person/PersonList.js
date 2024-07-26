import React, { useEffect } from 'react';
import { SimpleList, Datagrid, TextField, EditButton, useGetIdentity, useRedirect, List } from 'react-admin';
import { ReferenceField } from '@semapps/field-components';
import { useMediaQuery } from '@mui/material';
import useAccountType from '../../hooks/useAccountType';

const PersonList = props => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const accountType = useAccountType();
  const { identity } = useGetIdentity();
  const redirect = useRedirect();

  useEffect(() => {
    if (accountType !== 'admin' && identity?.id) {
      redirect('show', 'Person', identity?.id);
    }
  }, [accountType, identity, redirect]);

  if (accountType !== 'admin') return null;

  return (
    <List perPage={25} {...props}>
      {xs ? (
        <SimpleList
          primaryText="%{pair:label}"
          secondaryText={
            <ReferenceField source="pair:hasType" reference="Type" link={false}>
              <TextField source="pair:label" />
            </ReferenceField>
          }
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="pair:firstName" />
          <TextField source="pair:lastName" />
          <ReferenceField source="pair:hasType" reference="Type" link={false}>
            <TextField source="pair:label" />
          </ReferenceField>
          <EditButton />
        </Datagrid>
      )}
    </List>
  );
};

export default PersonList;
