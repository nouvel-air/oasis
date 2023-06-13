import React from 'react';
import { List, SimpleList, Datagrid, TextField } from 'react-admin';
import { ReferenceField } from '@semapps/field-components';
import { useMediaQuery } from '@mui/material';

const ServiceList = props => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'));
  return (
    <List {...props}>
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
          <ReferenceField source="pair:offeredBy" reference="Place" link={false}>
            <TextField source="pair:label" />
          </ReferenceField>
        </Datagrid>
      )}
    </List>
  )
};

export default ServiceList;
