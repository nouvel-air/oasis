import React from 'react';
import { List, SimpleList, Datagrid, TextField, EditButton } from 'react-admin';
import { ReferenceField } from '@semapps/field-components';
import { useMediaQuery } from '@mui/material';

const PersonList = props => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'));
  return (
    <List {...props}>
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
  )
};

export default PersonList;
