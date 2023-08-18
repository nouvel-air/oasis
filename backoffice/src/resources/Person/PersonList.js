import React from 'react';
import { SimpleList, Datagrid, TextField, EditButton } from 'react-admin';
import { ReferenceField } from '@semapps/field-components';
import { ListWithPermissions } from '@semapps/auth-provider';
import { useMediaQuery } from '@mui/material';

const PersonList = props => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'));
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
  )
};

export default PersonList;
