import React from 'react';
import { TabbedForm, ReferenceManyField, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';
import { ReferenceField } from '@semapps/field-components';
import { EditWithPermissions } from '@semapps/auth-provider';
import PlaceForm from './PlaceForm';
import AddServiceButton from '../../common/button/AddServiceButton';
import PlaceToolbar from './PlaceToolbar';

const PlaceEdit = () => (
  <EditWithPermissions>
    <TabbedForm toolbar={<PlaceToolbar />}>
      <TabbedForm.Tab label="Description">
        <PlaceForm />
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Services">
        <ReferenceManyField reference="Service" target="pair:offeredBy" fullWidth>
          <Datagrid rowClick="edit">
            <TextField source="pair:label" />
            <ReferenceField source="cdlt:hasServiceType" reference="Type" link={false}>
              <TextField source="pair:label" />
            </ReferenceField>
            <TextField source="cdlt:price" />
            <TextField source="cdlt:capacity" />
            <EditButton />
            <DeleteButton />
          </Datagrid>
        </ReferenceManyField>
        <AddServiceButton />
      </TabbedForm.Tab>
    </TabbedForm>
  </EditWithPermissions>
);

export default PlaceEdit;
