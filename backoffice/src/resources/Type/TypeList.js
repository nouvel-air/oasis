import React from 'react';
import { Datagrid, SimpleList, TextField, EditButton, List } from 'react-admin';
import { useMediaQuery } from '@mui/material';

const TypeList = () => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'));
  return (
    <List perPage={25}>
      {xs ? (
        <SimpleList primaryText="%{pair:label}" secondaryText="%{type}" />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="pair:label" />
          <TextField source="type" />
          <EditButton />
        </Datagrid>
      )}
    </List>
  );
};

export default TypeList;
