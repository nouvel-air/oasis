import React from 'react';
import { Form, TextInput, useRecordContext, useNotify } from 'react-admin';
import { Button, Dialog, DialogContent, DialogContentText, DialogActions, Typography, useMediaQuery } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ContactDialog = ({ open, onClose, service }) => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'), { noSsr: true });
  const record = useRecordContext();
  const notify = useNotify();

  const onSubmit = async ({ name, email, content }) => {
    const result = await fetch(process.env.REACT_APP_MIDDLEWARE_URL + '_mailer/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resourceUri: record['@id'] || record.id, name, email, content })
    });
  
    if (result.ok) {
      onClose();
      notify('Votre message a bien été envoyé', { type: 'success' });
    } else {
      const json = await result.json();
      notify(json ? json.message : "Votre message n'a pas pu être envoyé", { type: 'error' });
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <Form onSubmit={onSubmit} defaultValues={{ content: service ? `Je suis intéressé par le service "${service['pair:label']}".` : "" }}>
        <DialogContent sx={{ pt: 3, pb: 0, width: xs ? undefined : 500 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Formulaire de contact
          </Typography>
          <DialogContentText>
            <TextInput source="name" label="Votre nom" fullWidth />
            <TextInput source="email" label="Adresse mail" fullWidth />
            <TextInput source="content" label="Votre message" fullWidth multiline rows={5} />
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
