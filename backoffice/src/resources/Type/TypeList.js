import React from 'react';
import { List, Datagrid, SimpleList, TextField, EditButton } from 'react-admin';
import { useMediaQuery } from '@mui/material';

const TypeList = () => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'));
  return (
    <List>
      {xs ? (
        <SimpleList
          primaryText="%{pair:label}"
          secondaryText="%{type}"
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="pair:label" />
          <TextField source="type" />
          <EditButton />
        </Datagrid>
      )}
    </List>
  );
}

export default TypeList;
