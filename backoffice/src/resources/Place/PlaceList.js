import React from 'react';
import { List, SimpleList, Datagrid, TextField, EditButton, SingleFieldList, ChipField } from 'react-admin';
import { useMediaQuery } from '@mui/material';
import { ReferenceArrayField } from '@semapps/field-components';
import PublishButton from '../../common/button/PublishButton';

const PlaceList = props => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'));
  return (
    <List {...props}>
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
    </List>
  )
};

export default PlaceList;
