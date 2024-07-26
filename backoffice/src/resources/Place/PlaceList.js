import React from 'react';
import {
  SimpleList,
  Datagrid,
  TextField,
  EditButton,
  SingleFieldList,
  ChipField,
  useGetIdentity,
  List
} from 'react-admin';
import { useMediaQuery } from '@mui/material';
import { ReferenceArrayField } from '@semapps/field-components';
import PublishButton from '../../common/button/PublishButton';
import useAccountType from '../../hooks/useAccountType';

const PlaceList = props => {
  const accountType = useAccountType();
  const { identity } = useGetIdentity();
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'));
  if (!identity?.id) return;
  return (
    <List filter={accountType === 'admin' ? {} : { 'pair:affiliates': identity?.id }} perPage={25} {...props}>
      {xs ? (
        <SimpleList primaryText="%{pair:label}" />
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
  );
};

export default PlaceList;
