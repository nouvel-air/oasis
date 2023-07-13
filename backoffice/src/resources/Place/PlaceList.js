import React from 'react';
import { SimpleList, Datagrid, TextField, EditButton, SingleFieldList, ChipField, useGetIdentity } from 'react-admin';
import { useMediaQuery } from '@mui/material';
import { ReferenceArrayField } from '@semapps/field-components';
import { ListWithPermissions } from '@semapps/auth-provider';
import PublishButton from '../../common/button/PublishButton';
import useIsAdmin from '../../hooks/useIsAdmin';

const PlaceList = props => {
  const isAdmin = useIsAdmin();
  const { identity } = useGetIdentity();
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'));
  if (!identity?.id) return;
  return (
    <ListWithPermissions filter={isAdmin ? {} : { 'cdlt:proposedBy': identity?.id }} {...props}>
      {xs ? (
        <SimpleList
          primaryText="%{pair:label}"
        />
    ) : (
        <Datagrid rowClick="edit">
          <TextField source="pair:label" />
          <TextField source="pair:hasPostalAddress.pair:label" />
          <ReferenceArrayField reference="Type" source="cdlt:hasServiceType">
            <SingleFieldList linkType={false}>
                <ChipField source="pair:label" />
            </SingleFieldList>
          </ReferenceArrayField>
          <EditButton />
          <PublishButton />
        </Datagrid>
      )}
    </ListWithPermissions>
  )
};

export default PlaceList;
