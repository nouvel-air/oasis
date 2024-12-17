import React from 'react';
import { FormDataConsumer, email, required, TextInput } from 'react-admin';
import { TypeInput, OrganizationOrPlaceInput, GroupInput, StatusesInput } from '../../common/input';
import useAccountType from '../../hooks/useAccountType';

export const PersonForm = ({ isCreate }) => {
  const accountType = useAccountType();
  return (
    <>
      <TextInput source="pair:firstName" fullWidth validate={[required()]} />
      <TextInput source="pair:lastName" fullWidth validate={[required()]} />
      {isCreate && <TextInput source="pair:e-mail" fullWidth validate={[required(), email()]} />}
      {accountType === 'admin' && (
        <TypeInput source="pair:hasType" filter={{ a: 'pair:PersonType' }} fullWidth /*disabled={!isCreate}*/ />
      )}
      <FormDataConsumer>
        {({ formData, ...rest }) => (
          <>
            {formData['pair:hasType'] === process.env.REACT_APP_MIDDLEWARE_URL + 'types/actor' && (
              <OrganizationOrPlaceInput
                source="pair:affiliatedBy"
                validate={required()}
                disabled={accountType !== 'admin'}
                {...rest}
              />
            )}
            {formData['pair:hasType'] === process.env.REACT_APP_MIDDLEWARE_URL + 'types/member' && (
              <GroupInput source="pair:partOf" validate={required()} disabled={accountType !== 'admin'} {...rest} />
            )}
          </>
        )}
      </FormDataConsumer>
      {accountType === 'admin' && !isCreate && (
        <StatusesInput source="pair:hasStatus" label={false} filter={{ a: 'pair:ActorStatus' }} />
      )}
    </>
  );
};

export default PersonForm;
