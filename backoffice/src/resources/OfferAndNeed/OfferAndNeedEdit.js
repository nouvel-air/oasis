import React from 'react';
import { SimpleForm, Edit, useRecordContext, Link } from 'react-admin';
import Alert from '@mui/material/Alert';
import OfferAndNeedForm from './OfferAndNeedForm';
import EditToolbar from '../../common/toolbar/EditToolbar';
import { STATUS_EXPIRED } from '../../constants';
import useDuplicateLink from '../../hooks/useDuplicateLink';
import useAccountType from '../../hooks/useAccountType';

const AlertExpired = () => {
  const record = useRecordContext();
  const accountType = useAccountType();
  const isExpired = accountType !== 'admin' && record?.['cdlt:hasPublicationStatus'] === STATUS_EXPIRED;
  const duplicateLink = useDuplicateLink();

  if (isExpired) {
    return (
      <Alert severity="warning" sx={{ marginBottom: 2, width: '100%' }}>
        Cette annonce est expirée et ne peut plus être modifiée. Vous avez la possibilité de la <Link to={duplicateLink} style={{ textDecoration: 'underline' }}>
          dupliquer
        </Link>.
      </Alert>
    );
  } else {
    return null;
  }
};

const OfferAndNeedEdit = () => (
  <Edit redirect="list">
    <AlertExpired />
    <SimpleForm toolbar={<EditToolbar />}>
      <OfferAndNeedForm />
    </SimpleForm>
  </Edit>
);

export default OfferAndNeedEdit;
