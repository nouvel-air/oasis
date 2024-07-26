import React, { useState } from 'react';
import {
  Button,
  SaveButton,
  Toolbar,
  useNotify,
  useDataProvider,
  useRecordContext,
  useRedirect,
  Confirm,
  useLogout,
  useGetIdentity
} from 'react-admin';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled, alpha } from '@mui/material/styles';

const PlaceToolbar = props => {
  const dataProvider = useDataProvider();
  const { data: identity } = useGetIdentity();
  const logout = useLogout();
  const record = useRecordContext();
  const notify = useNotify();
  const redirect = useRedirect();
  const [open, setOpen] = useState(false);

  const onDelete = () => {
    dataProvider
      .getList('OfferAndNeed', { filter: { 'pair:offeredBy': record.id } })
      .then(({ data }) => dataProvider.deleteMany('OfferAndNeed', { ids: data.map(offerAndNeed => offerAndNeed.id) }))
      .then(() => dataProvider.delete('Person', { id: record.id }))
      .then(() => {
        notify('Compte supprimé', { type: 'success', undoable: false });
        if (identity.id === record.id) logout();
        redirect('/');
      })
      .catch(e => {
        notify(`Erreur lors de la suppression: ${e.message}`, { type: 'error' });
      });
  };

  return (
    <Toolbar {...props}>
      <SaveButton />
      <StyledButton label="ra.action.delete" onClick={() => setOpen(true)}>
        <DeleteIcon />
      </StyledButton>
      <Confirm
        isOpen={open}
        title={`Suppression du compte "${record['pair:label']}"`}
        content="Etes vous sûr de vouloir supprimer ce compte et toutes les annonces associées ? Cette action est irréversible."
        onConfirm={onDelete}
        onClose={() => setOpen(false)}
      />
    </Toolbar>
  );
};

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.error.main,
  marginLeft: 15,
  '&:hover': {
    backgroundColor: alpha(theme.palette.error.main, 0.12),
    // Reset on mouse devices
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }
}));

export default PlaceToolbar;
