import React from 'react';
import { Datagrid, SimpleList, TextField, EditButton } from 'react-admin';
import { ListWithPermissions } from '@semapps/auth-provider';
import { useMediaQuery } from '@mui/material';

const TypeList = () => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'));
  return (
    <ListWithPermissions perPage={25}>
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
    </ListWithPermissions>
  );
}

export default TypeList;
