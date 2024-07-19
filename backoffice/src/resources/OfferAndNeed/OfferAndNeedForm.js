import React, { useEffect } from 'react';
import { TextInput, ImageField, required, useGetIdentity, email, useDataProvider } from 'react-admin';
import { useFormContext } from 'react-hook-form';
import { MarkdownInput } from '@semapps/markdown-components';
import { ImageInput } from '@semapps/input-components';
import { OrganizationOrPlaceInput, TypeInput } from '../../common/input';
import DateTimeInput from '../../common/input/DateTimeInput';
import useAccountType from '../../hooks/useAccountType';
import LocationInput from '../../common/input/LocationInput';
import { TYPE_ANNONCE_EVENEMENT, TYPE_ANNONCE_EMPLOI } from '../../constants';

const filterNoParent = [
  {
    type: 'filter',
    expression: {
      type: 'operation',
      operator: 'notexists',
      args: [
        {
          type: 'bgp',
          triples: [
            {
              subject: {
                termType: 'Variable',
                value: 's1'
              },
              predicate: {
                termType: 'NamedNode',
                value: 'http://virtual-assembly.org/ontologies/pair#partOf'
              },
              object: {
                termType: 'Variable',
                value: 'parent'
              }
            }
          ]
        }
      ]
    }
  }
];

const OfferAndNeedForm = () => {
  const accountType = useAccountType();
  const { identity } = useGetIdentity();
  const form = useFormContext();
  const dataProvider = useDataProvider();

  const formData = form.getValues();

  useEffect(() => {
    (async () => {
      if (formData['pair:offeredBy']) {
        const { data } = await dataProvider.getOne('OrganizationOrPlace', { id: formData['pair:offeredBy'] });
        if (data && data['pair:hasPostalAddress'] && !formData['pair:hasPostalAddress']) {
          form.setValue('pair:hasPostalAddress', data['pair:hasPostalAddress']);
        }
      }
    })();
  }, [form, formData, dataProvider]);

  if (!identity?.id) return;

  return (
    <>
      <TypeInput
        source="pair:hasType"
        filter={{ a: 'cdlt:OfferAndNeedType', sparqlWhere: filterNoParent }}
        validate={[required()]}
      />
      {(formData['pair:hasType'] === TYPE_ANNONCE_EVENEMENT || formData['pair:hasType'] === TYPE_ANNONCE_EMPLOI) && (
        <TypeInput
          source="cdlt:hasSubType"
          filter={{ 'pair:partOf': formData['pair:hasType'] }}
          validate={[required()]}
        />
      )}
      {(accountType === 'actor' || accountType === 'admin') && (
        <OrganizationOrPlaceInput
          source="pair:offeredBy"
          validate={[required()]}
          filter={accountType === 'admin' ? {} : { 'pair:affiliates': identity?.id }}
        />
      )}
      <LocationInput source="pair:hasPostalAddress" validate={[required()]} fullWidth />
      <TextInput source="pair:label" fullWidth validate={[required()]} />
      <MarkdownInput source="pair:description" fullWidth validate={[required()]} />
      <TextInput source="pair:homePage" fullWidth />
      <ImageInput source="pair:depictedBy" accept="image/*" validate={[required()]}>
        <ImageField source="src" />
      </ImageInput>
      {formData['pair:hasType'] === TYPE_ANNONCE_EVENEMENT ? (
        <>
          <DateTimeInput source="pair:startDate" />
          <DateTimeInput source="pair:endDate" />
        </>
      ) : (
        <DateTimeInput source="pair:endDate" label="Date d'expiration" />
      )}
      <TextInput source="pair:e-mail" fullWidth validate={[required(), email()]} />
      <TextInput source="pair:phone" fullWidth validate={[required()]} />
    </>
  );
};

export default OfferAndNeedForm;
