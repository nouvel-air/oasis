import React from 'react';
import { SaveButton, DeleteWithConfirmButton, Toolbar } from 'react-admin';
import useAccountType from '../../hooks/useAccountType';

const EditToolbar = ({ adminOnlyDelete = true }) => {
  const accountType = useAccountType();
  return (
    <Toolbar>
      <SaveButton />
      {(!adminOnlyDelete || accountType === 'admin') && (
        <DeleteWithConfirmButton
          confirmTitle="Attention !"
          confirmContent="Cette action est irréversible. Êtes-vous sûr de vouloir continuer ?"
          confirmColor="warning"
          sx={{ pl: 2 }}
        />
      )}
    </Toolbar>
  );
};

export default EditToolbar;
