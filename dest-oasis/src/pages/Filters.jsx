import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, SvgIcon, Typography } from '@mui/material';
import { services } from '../config/constants';
import { ReactComponent as AllServicesIcon } from '../assets/all.svg';

const Choice = ({ icon, label, iconColor, labelColor }) => (
  <Box flexGrow={1} alignItems="stretch">
    <Box align="center" mt={4} mb={2}>
      <SvgIcon htmlColor={iconColor} sx={{ width: 40, height: '100%', marginLeft: 2, marginRight: 2 }}>
        {React.createElement(icon)}
      </SvgIcon>
    </Box>
    <Typography variant="body2" color={labelColor} align="center" sx={{ textTransform: 'lowercase' }} >
      {label}
    </Typography>
  </Box>
);

const Filters = () => (
  <Container display="flex" p={1}>
    <Choice icon={AllServicesIcon} label={<span>Toutes les<br />offres</span>} iconColor="#FF96A0" labelColor="primary.main" />
    {services.map(service => (
      <Choice key={service.id} {...service} iconColor="#D3D3D3" labelColor="secondary.main" />
    ))}
  </Container>
)

const Container = styled(Box)({
  backgroundColor: 'white',
  borderRadius: 5,
  height: 170,
  position: 'absolute',
  bottom: -150,
  left: 0,
  right: 0,
  margin: 24
});

export default Filters;
