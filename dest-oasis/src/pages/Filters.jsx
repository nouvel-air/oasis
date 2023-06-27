import React, { useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, SvgIcon, Typography } from '@mui/material';
import { services } from '../config/constants';
import { ReactComponent as AllServicesIcon } from '../assets/all.svg';
import { useListContext } from 'react-admin';

const Choice = ({ icon, label, selected, onSelect }) => (
  <Box flexGrow={1} alignItems="stretch" onClick={onSelect} sx={{ cursor: 'pointer' }}>
    <Box align="center" mt={4} mb={2}>
      <SvgIcon htmlColor={selected ? '#FF96A0' : '#D3D3D3'} sx={{ width: 40, height: '100%', marginLeft: 2, marginRight: 2 }}>
        {React.createElement(icon)}
      </SvgIcon>
    </Box>
    <Typography variant="body2" color={selected ? 'primary.main' : 'secondary.main'} align="center" sx={{ textTransform: 'lowercase' }} >
      {label}
    </Typography>
  </Box>
);

const Filters = () => {
  const { filterValues, setFilters } = useListContext(); 
  const [selected, setSelected] = useState(filterValues['cdlt:hasServiceType']);
  const select = useCallback(serviceUri => {
    setSelected(serviceUri);
    setFilters({ 'cdlt:hasServiceType': serviceUri });
  }, [setSelected, setFilters]);
  const clear = useCallback(() => {
    setSelected(undefined);
    setFilters({ 'cdlt:hasServiceType': undefined });
  }, [setSelected, setFilters]);
  return (
    <Container display="flex" p={1}>
      <Choice 
        icon={AllServicesIcon} 
        label={<span>Toutes les<br />offres</span>} 
        selected={!selected}
        onSelect={() => select(undefined)}
      />
      {services.map(service => (
        <Choice 
          key={service.id} 
          {...service} 
          selected={selected === service.id}
          onSelect={() => select(service.id)} 
        />
      ))}
    </Container>
  );
};

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
