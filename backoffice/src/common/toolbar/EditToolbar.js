import React from 'react';
import { SaveButton, DeleteWithConfirmButton, Toolbar, useRecordContext } from 'react-admin';
import useAccountType from '../../hooks/useAccountType';
import { STATUS_EXPIRED } from '../../constants';

const EditToolbar = ({ adminOnlyDelete = true }) => {
  const accountType = useAccountType();
  const record = useRecordContext();
  const isFormDisabled = accountType !== 'admin' && record?.['cdlt:hasPublicationStatus'] === STATUS_EXPIRED;

  return (
    <Toolbar>
      <SaveButton disabled={isFormDisabled} />
      {(!adminOnlyDelete || accountType === 'admin') && (
        <DeleteWithConfirmButton
          confirmTitle="Attention !"
          confirmContent="Cette action est irréversible. Êtes-vous sûr de vouloir continuer ?"
          sx={{ pl: 2 }}
        />
      )}
    </Toolbar>
  );
};

export default EditToolbar;
