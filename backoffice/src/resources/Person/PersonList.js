import React from 'react';
import { SimpleList, Datagrid, TextField, EditButton, useGetIdentity, useRedirect } from 'react-admin';
import { ReferenceField } from '@semapps/field-components';
import { ListWithPermissions } from '@semapps/auth-provider';
import { useMediaQuery } from '@mui/material';
import useAccountType from '../../hooks/useAccountType';

const PersonList = props => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const accountType = useAccountType();
  const { identity } = useGetIdentity();
  const redirect = useRedirect();

  if (!accountType || !identity?.id) return null;

  if (accountType !== 'admin') {
    redirect('show', 'Person', identity?.id);
    return null;
  } else {
    return (
      <ListWithPermissions perPage={25} {...props}>
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
      </ListWithPermissions>
    );
  }
};

export default PersonList;
