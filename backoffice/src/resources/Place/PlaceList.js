import React from 'react';
import { List, SimpleList, Datagrid, TextField } from 'react-admin';
import { useMediaQuery } from '@mui/material';

const PlaceList = props => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'));
  return (
    <List {...props}>
      {xs ? (
          <SimpleList
              primaryText="pair:label"
              // secondaryText={record => `${record.views} views`}
          />
      ) : (
          <Datagrid rowClick="edit">
            <TextField source="pair:label" />
            <TextField source="pair:hasPostalAddress.pair:label" />
          </Datagrid>
      )}
    </List>
  )
};

export default PlaceList;
