import React from 'react';
import { TabbedForm, ReferenceManyField, Datagrid, TextField, EditButton, DeleteButton, Edit } from 'react-admin';
import { ReferenceField } from '@semapps/field-components';
import PlaceForm from './PlaceForm';
import AddServiceButton from '../../common/button/AddServiceButton';
import AddOfferAndNeedButton from '../../common/button/AddOfferAndNeedButton';
import PlaceToolbar from './PlaceToolbar';
import { offerOrEventSparql } from '../../constants';

const PlaceEdit = () => (
  <Edit>
    <TabbedForm toolbar={<PlaceToolbar />}>
      <TabbedForm.Tab label="Description">
        <PlaceForm />
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Services">
        <ReferenceManyField reference="Service" target="pair:offeredBy" filter={{ a: 'cdlt:HostingService' }} fullWidth>
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
      <TabbedForm.Tab label="Annonces">
        <ReferenceManyField
          reference="OfferAndNeed"
          target="pair:offeredBy"
          filter={{ sparqlWhere: offerOrEventSparql }}
          fullWidth
        >
          <Datagrid rowClick="edit">
            <TextField source="pair:label" />
            <ReferenceField source="pair:hasType" reference="Type" link={false}>
              <TextField source="pair:label" />
            </ReferenceField>
            <EditButton />
            <DeleteButton />
          </Datagrid>
        </ReferenceManyField>
        <AddOfferAndNeedButton />
      </TabbedForm.Tab>
    </TabbedForm>
  </Edit>
);

export default PlaceEdit;
