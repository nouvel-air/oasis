import React from 'react';
import { SimpleList, Datagrid, TextField, EditButton } from 'react-admin';
import { ListWithPermissions } from '@semapps/auth-provider';
import { useMediaQuery } from '@mui/material';

const PageList = () => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'));
  return (
    <ListWithPermissions perPage={25}>
      {xs ? (
        <SimpleList primaryText="semapps:title" />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="semapps:title" />
          <EditButton />
        </Datagrid>
      )}
    </ListWithPermissions>
  )
};

export default PageList;
