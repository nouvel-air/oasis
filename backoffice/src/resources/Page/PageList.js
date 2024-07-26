import React from 'react';
import { SimpleList, Datagrid, TextField, EditButton, List } from 'react-admin';
import { useMediaQuery } from '@mui/material';

const PageList = () => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'));
  return (
    <List perPage={25}>
      {xs ? (
        <SimpleList primaryText="semapps:title" />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="semapps:title" />
          <EditButton />
        </Datagrid>
      )}
    </List>
  );
};

export default PageList;
