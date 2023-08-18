import React from 'react';
import { SimpleList, Datagrid, TextField, EditButton, useGetIdentity } from 'react-admin';
import { ListWithPermissions } from '@semapps/auth-provider';
import { ReferenceField } from '@semapps/field-components';
import { useMediaQuery } from '@mui/material';
import useIsAdmin from '../../hooks/useIsAdmin';

const defaultToArray = value => !value ? [] : Array.isArray(value) ? value : [value];

const filterByPlaces = places => ([
  {
    type: "values",
    values: places.map(placeUri => ({
      "?placeUri": {
        termType: "NamedNode",
        value: placeUri
      }
    }))
  },
  {
    type: "bgp",
    triples: [
      {
        subject: { termType: "Variable", value: "s1" },
        predicate: { termType: "NameNode", value: "http://virtual-assembly.org/ontologies/pair#offeredBy" },
        object: { termType: "Variable", value: "placeUri" }
      }
    ]
  }
]);

const ServiceList = props => {
  const isAdmin = useIsAdmin();
  const { identity } = useGetIdentity();
  const ownedPlaces = defaultToArray(identity?.webIdData?.['cdlt:proposes']);
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'));
  if (!identity?.id) return;
  return (
    <ListWithPermissions filter={isAdmin ? {} : { sparqlWhere: filterByPlaces(ownedPlaces) }} perPage={25} {...props}>
      {xs ? (
        <SimpleList
          primaryText="%{pair:label}"
          secondaryText={
            <ReferenceField source="pair:offeredBy" reference="Place" link={false}>
              <TextField source="pair:label" />
            </ReferenceField>
          }
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="pair:label" />
          <ReferenceField source="cdlt:hasServiceType" reference="Type" link={false}>
            <TextField source="pair:label" />
          </ReferenceField>
          <ReferenceField source="pair:offeredBy" reference="Place" link={false}>
            <TextField source="pair:label" />
          </ReferenceField>
          <EditButton />
        </Datagrid>
      )}
    </ListWithPermissions>
  )
};

export default ServiceList;
