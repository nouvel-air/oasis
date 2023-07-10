import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const ContactButton = () => (
  <StyledButton variant="contained" color="primary">Contactez-les</StyledButton>
)

const StyledButton = styled(Button)({
  color: 'white',
  borderRadius: 20,
  fontSize: '18px',
  textHeight: '21.6px',
  fontWeight: 500,
  padding: '4px 45px',
  textTransform: 'none',
  marginTop: 15
});

export default ContactButton;
