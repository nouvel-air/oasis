import React, { useEffect } from 'react';
import {
  TextInput,
  required,
  useGetIdentity,
  email,
  maxLength,
  minLength,
  regex,
  useDataProvider,
  FormDataConsumer,
  BooleanInput
} from 'react-admin';
import { useFormContext, useWatch } from 'react-hook-form';
import ImageInput, { numFiles } from '../../common/input/ImageInput';
import { PersonOrganizationOrPlaceInput, OrganizationOrPlaceInput, TypeInput, StatusInput } from '../../common/input';
import DateTimeInput from '../../common/input/DateTimeInput';
import useAccountType from '../../hooks/useAccountType';
import LocationInput from '../../common/input/LocationInput';
import { TYPE_ANNONCE_AGENDA, TYPE_ANNONCE_EMPLOI } from '../../constants';
import { filterNoParent } from '../../queries';

// const toolbarCommands = [
//   ['header', 'bold', 'italic', 'strikethrough'],
//   ['link'],
//   ['unordered-list', 'ordered-list']
// ];

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

const OfferAndNeedForm = ({ isCreate }) => {
  const accountType = useAccountType();
  const { identity } = useGetIdentity();
  const { setValue, getValues, resetField } = useFormContext();
  const dataProvider = useDataProvider();

  const categoryUri = useWatch({ name: 'pair:hasType' });
  const offeredByUri = useWatch({ name: 'pair:offeredBy' });

  useEffect(() => {
    (async () => {
      if (offeredByUri) {
        const formData = getValues();
        const { data } = await dataProvider.getOne('OrganizationOrPlace', { id: offeredByUri });
        if (data && data['pair:hasPostalAddress'] && !formData['pair:hasPostalAddress']) {
          setValue('pair:hasPostalAddress', data['pair:hasPostalAddress']);
        }
        if (data && data['pair:e-mail'] && !formData['pair:e-mail']) {
          setValue('pair:e-mail', data['pair:e-mail']);
        }
      }
    })();
  }, [offeredByUri, setValue, getValues, dataProvider]);

  useEffect(() => {
    (async () => {
      if (categoryUri) {
        if (categoryUri === TYPE_ANNONCE_AGENDA) {
          resetField('pair:startDate');
          resetField('pair:endDate');
        } else {
          const formData = getValues();
          // If the expiration date is not set yet, set it in 6 months
          if (!formData['pair:endDate']) {
            const endDate = new Date();
            endDate.setMonth(endDate.getMonth() + 6);
            setValue('pair:endDate', endDate.toISOString());
          }
        }
      }
    })();
  }, [categoryUri, setValue, resetField, getValues]);

  if (!identity?.id) return;

  return (
    <>
      <TextInput source="pair:label" fullWidth validate={[required(), maxLength(100)]} />
      {accountType !== 'agent' && (
        <TypeInput
          source="pair:hasType"
          filter={{ a: 'cdlt:OfferAndNeedType', sparqlWhere: filterNoParent }}
          validate={[required()]}
          disabled={!isCreate}
        />
      )}
      <FormDataConsumer>
        {({ formData }) =>
          (formData['pair:hasType'] === TYPE_ANNONCE_AGENDA || formData['pair:hasType'] === TYPE_ANNONCE_EMPLOI) && (
            <TypeInput
              source="cdlt:hasSubType"
              filter={{ 'pair:partOf': formData['pair:hasType'] }}
              validate={[required()]}
            />
          )
        }
      </FormDataConsumer>
      {accountType === 'actor' && (
        <OrganizationOrPlaceInput
          source="pair:offeredBy"
          validate={[required()]}
          filter={{ 'pair:affiliates': identity?.id }}
        />
      )}
      {accountType === 'admin' && <PersonOrganizationOrPlaceInput source="pair:offeredBy" validate={[required()]} />}
      <TextInput
        source="pair:description"
        fullWidth
        validate={[required(), maxLength(50_000), minLength(50)]}
        multiline
        rows={10}
      />
      <LocationInput source="pair:hasPostalAddress" validate={[required()]} fullWidth />
      <TextInput
        source="pair:homePage"
        fullWidth
        placeholder="https://"
        validate={[
          regex(
            /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
            'Seules les URLs de type https:// sont autorisés'
          ),
          maxLength(2048)
        ]}
      />
      <ImageInput
        source="pair:depictedBy"
        validate={[required(), numFiles(1, 1)]}
        placeholder="Déposez ici l'image à uploader, ou cliquez pour en sélectionner (taille maximale: 2Mb)"
      />
      <FormDataConsumer>
        {({ formData }) =>
          formData['pair:hasType'] === TYPE_ANNONCE_AGENDA ? (
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
          )
        }
      </FormDataConsumer>
      <TextInput source="pair:e-mail" fullWidth validate={[required(), email()]} />
      <TextInput
        source="pair:phone"
        fullWidth
        validate={[regex(/^[\d\s+()]*$/, 'Seuls les chiffres et les espaces sont autorisés')]}
      />
      {accountType === 'admin' && (
        <StatusInput
          source="cdlt:hasPublicationStatus"
          filter={{ a: 'cdlt:PublicationStatus' }}
          label={false}
          validate={[required()]}
          // sx={{ '& p': { display: 'none' }, marginTop: -0.5 }}
        />
      )}
      {accountType === 'agent' && isCreate && (
        <BooleanInput
          source="cdlt:paymentAccepted"
          label={
            <span>
              Je certifie avoir payé pour la pbulication de mon annonce via{' '}
              <a href="https://www.helloasso.com/associations/cooperative-oasis/boutiques/publication-d-une-annonce">
                HelloAsso
              </a>
              . Mon annonce sera validée une fois le paiement vérifié.
            </span>
          }
          required
          sx={{ '& p': { display: 'none' } }}
        />
      )}
      <BooleanInput
        source="cdlt:publishOnEcovillageGlobal"
        label={
          <span>
            Je souhaite que mon annonce soit diffusée sur <a href="https://ecovillageglobal.fr">ecovillageglobal.fr</a>{' '}
            et dans la revue Passerelle Éco. J'accepte la{' '}
            <a href="https://ecovillageglobal.fr/Bienvenue#combien">politique tarifaire</a>.
          </span>
        }
        sx={{ '& p': { display: 'none' } }}
      />
    </>
  );
};

export default OfferAndNeedForm;
