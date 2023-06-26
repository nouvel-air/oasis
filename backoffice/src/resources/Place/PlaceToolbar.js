import React, { useState } from 'react';
import { Button, SaveButton, Toolbar, useNotify, useDataProvider, useRecordContext, useRedirect, Confirm } from 'react-admin';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled, alpha } from '@mui/material/styles';

const PlaceToolbar = (props) => {
  const dataProvider = useDataProvider();
  const record = useRecordContext();
  const notify = useNotify();
  const redirect = useRedirect();
  const [open, setOpen] = useState(false);

  const onDelete = () => {
    dataProvider
      .getList('Service', { filter: { 'pair:offeredBy': record.id } })
      .then(({ data }) => dataProvider.deleteMany('Service', { ids: data.map(service => service.id) }))
      .then(() => dataProvider.delete('Place', { id: record.id }))
      .then(() => {
        notify('Oasis supprimée', { type: 'success', undoable: false });
        redirect('list', '/Place');
      })
      .catch(e => {
        notify(`Erreur lors de la suppression: ${e.message}`, { type: 'error' });
      })
  };

  return (
    <Toolbar {...props}>
      <SaveButton />
      <StyledButton
        label="ra.action.delete"
        onClick={() => setOpen(true)}
      >
        <DeleteIcon />
      </StyledButton>
      <Confirm
        isOpen={open}
        title={`Suppression de l'oasis "${record['pair:label']}"`}
        content="Etes vous sûr de vouloir supprimer l'oasis et tous ses services ?"
        onConfirm={onDelete}
        onClose={() => setOpen(false)}
      />
    </Toolbar>
  );
}

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.error.main,
  marginLeft: 15,
  '&:hover': {
      backgroundColor: alpha(theme.palette.error.main, 0.12),
      // Reset on mouse devices
      '@media (hover: none)': {
          backgroundColor: 'transparent',
      },
  },
}));

export default PlaceToolbar;
