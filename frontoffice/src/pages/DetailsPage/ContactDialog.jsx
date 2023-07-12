import React from 'react';
import { Form, TextInput } from 'react-admin';
import { Button, Dialog, DialogContent, DialogContentText, DialogActions, Typography, useMediaQuery } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ContactDialog = ({ open, onClose, service }) => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'), { noSsr: true });
  const onSubmit = ({ name, email, message }) => {
    console.log('values', name, email, message);
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <Form onSubmit={onSubmit} defaultValues={{ message: service ? `Je suis intéressé par le service "${service['pair:label']}".` : "" }}>
        <DialogContent sx={{ pt: 3, pb: 0, width: xs ? undefined : 500 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Formulaire de contact
          </Typography>
          <DialogContentText>
            <TextInput source="name" label="Votre nom" fullWidth />
            <TextInput source="email" label="Adresse mail" fullWidth />
            <TextInput source="message" label="Votre message" fullWidth multiline rows={5} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type="submit" startIcon={<SendIcon />} sx={{ mr: 1 }}>Envoyer</Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default ContactDialog;
