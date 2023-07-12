import React from 'react';
import { Button, Dialog, DialogContent, DialogContentText, DialogActions, Typography } from '@mui/material';
import { MarkdownField } from '@semapps/markdown-components';
import CloseIcon from '@mui/icons-material/Close';

const DescriptionDialog = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogContent sx={{ pt: 3, pb: 0 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Description
      </Typography>
      <DialogContentText>
        <MarkdownField source="pair:description" />
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} startIcon={<CloseIcon />} sx={{ mr: 1 }}>Fermer</Button>
    </DialogActions>
  </Dialog>
);

export default DescriptionDialog;
