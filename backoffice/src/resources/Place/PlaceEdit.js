import React from 'react';
import { Edit, TabbedForm, ReferenceManyField, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';
import { ReferenceField } from '@semapps/field-components';
import PlaceForm from './PlaceForm';
import PlaceTitle from './PlaceTitle';
import AddServiceButton from '../../common/button/AddServiceButton';

const PlaceEdit = () => (
  <Edit title={<PlaceTitle />}>
    <TabbedForm>
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
  </Edit>
);

export default PlaceEdit;
