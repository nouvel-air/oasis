import React from 'react';
import { List, SimpleList, Datagrid, TextField, EditButton } from 'react-admin';
import { useMediaQuery } from '@mui/material';

const PlaceList = props => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'));
  return (
    <List {...props}>
      {xs ? (
        <SimpleList
          primaryText="%{pair:label}"
          secondaryText="%{pair:hasPostalAddress.pair:label}"
        />
    ) : (
        <Datagrid rowClick="edit">
          <TextField source="pair:label" />
          <TextField source="pair:hasPostalAddress.pair:label" />
          <EditButton />
        </Datagrid>
      )}
    </List>
  )
};

export default PlaceList;
