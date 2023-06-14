import React from 'react';
import { SimpleList, Datagrid, TextField, List, EditButton } from 'react-admin';
import { useMediaQuery } from '@mui/material';

const PageList = () => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'));
  return (
    <List>
      {xs ? (
        <SimpleList primaryText="semapps:title" />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="semapps:title" />
          <EditButton />
        </Datagrid>
      )}
    </List>
  )
};

export default PageList;
