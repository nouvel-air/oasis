import React, { useEffect } from 'react';
import {
  TextInput,
  ImageField,
  required,
  useGetIdentity,
  email,
  useDataProvider,
  CheckboxGroupInput
} from 'react-admin';
import { useFormContext } from 'react-hook-form';
import Markdown from 'markdown-to-jsx';
import { MarkdownInput } from '@semapps/markdown-components';
import { ImageInput } from '@semapps/input-components';
import { OrganizationOrPlaceInput, TypeInput, StatusInput } from '../../common/input';
import DateTimeInput from '../../common/input/DateTimeInput';
import useAccountType from '../../hooks/useAccountType';
import LocationInput from '../../common/input/LocationInput';
import { TYPE_ANNONCE_AGENDA, TYPE_ANNONCE_EMPLOI } from '../../constants';

const max6months = value => {
  let date = new Date();
  date.setMonth(date.getMonth() + 6);
  if (value && new Date(value) > date) {
    return 'Les annonces ne peuvent pas excéder 6 mois';
  }
};

const futureDate = value => {
  if (value && new Date(value) <= new Date()) {
    return 'Doit être dans le futur';
  }
};

const afterStartDate = (value, allValues) => {
  if (allValues['pair:startDate']) {
    const endDate = new Date(value);
    const startDate = new Date(allValues['pair:startDate']);
    if (endDate <= startDate) return "Doit être après la date de début de l'événement";
  }
};

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

const MarkdownChoice = ({ name }) => {
  return (
    <Markdown
      options={{
        overrides: {
          a: {
            props: {
              target: '_blank'
            }
          }
        }
      }}
    >
      {name}
    </Markdown>
  );
};

const OfferAndNeedForm = ({ isCreate }) => {
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
        if (data && data['pair:e-mail'] && !formData['pair:e-mail']) {
          form.setValue('pair:e-mail', data['pair:e-mail']);
        }
      }
    })();
  }, [form, formData, dataProvider]);

  if (!identity?.id) return;

  return (
    <>
      <TextInput source="pair:label" fullWidth validate={[required()]} />
      {accountType !== 'agent' && (
        <TypeInput
          source="pair:hasType"
          filter={{ a: 'cdlt:OfferAndNeedType', sparqlWhere: filterNoParent }}
          validate={[required()]}
          disabled={!isCreate}
        />
      )}
      {(formData['pair:hasType'] === TYPE_ANNONCE_AGENDA || formData['pair:hasType'] === TYPE_ANNONCE_EMPLOI) && (
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
      <MarkdownInput source="pair:description" fullWidth validate={[required()]} />
      <LocationInput source="pair:hasPostalAddress" validate={[required()]} fullWidth />
      <TextInput source="pair:homePage" fullWidth />
      <ImageInput source="pair:depictedBy" accept="image/*" validate={[required()]}>
        <ImageField source="src" />
      </ImageInput>
      {formData['pair:hasType'] === TYPE_ANNONCE_AGENDA ? (
        <>
          <DateTimeInput source="pair:startDate" validate={[required(), futureDate]} />
          <DateTimeInput source="pair:endDate" validate={[required(), afterStartDate]} />
        </>
      ) : (
        <DateTimeInput
          source="pair:endDate"
          label="Date d'expiration"
          validate={[required(), futureDate, max6months]}
        />
      )}
      <TextInput source="pair:e-mail" fullWidth validate={[required(), email()]} />
      <TextInput source="pair:phone" fullWidth validate={[required()]} />
      {accountType === 'agent' && isCreate && (
        <CheckboxGroupInput
          source="payment"
          choices={[
            {
              id: 'yes',
              name: 'Je certifie avoir payé XXX€ via [HelloAsso](https://www.helloasso.com/associations/cooperative-oasis). Mon annonce sera validée une fois le paiement vérifié.'
            }
          ]}
          label={false}
          validate={required()}
          optionText={MarkdownChoice}
        />
      )}
      {accountType === 'admin' && (
        <StatusInput
          source="cdlt:hasPublicationStatus"
          filter={{ a: 'cdlt:PublicationStatus' }}
          label={false}
          validate={[required()]}
        />
      )}
    </>
  );
};

export default OfferAndNeedForm;
