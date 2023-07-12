import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const ContactButton = props => (
  <StyledButton variant="contained" color="primary" {...props}>Contacter</StyledButton>
)

const StyledButton = styled(Button)({
  color: 'white',
  borderRadius: 20,
  fontSize: '18px',
  textHeight: '21.6px',
  fontWeight: 500,
  padding: '5px 60px 3px',
  textTransform: 'none',
  marginTop: 15
});

export default ContactButton;
