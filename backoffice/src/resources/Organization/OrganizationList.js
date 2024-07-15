import React from 'react';
import { SimpleList, Datagrid, TextField, EditButton } from 'react-admin';
import { ReferenceField } from '@semapps/field-components';
import { ListWithPermissions } from '@semapps/auth-provider';
import { useMediaQuery } from '@mui/material';

const OrganizationList = props => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'));
  return (
    <ListWithPermissions perPage={25} {...props}>
      {xs ? (
        <SimpleList
          primaryText="%{pair:label}"
          secondaryText={
            <ReferenceField source="pair:partOf" reference="Group" link={false}>
              <TextField source="pair:label" />
            </ReferenceField>
          }
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="pair:label" />
          <ReferenceField source="pair:partOf" reference="Group" link={false}>
            <TextField source="pair:label" />
          </ReferenceField>
          <TextField source="pair:e-mail" />
          <EditButton />
        </Datagrid>
      )}
    </ListWithPermissions>
  );
};

export default OrganizationList;
