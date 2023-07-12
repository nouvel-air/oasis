import React, { useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, SvgIcon, Typography, useMediaQuery, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { services } from '../../config/constants';
import { ReactComponent as AllServicesIcon } from '../../assets/all.svg';
import { useListContext } from 'react-admin';
import AddIcon from '@mui/icons-material/Add';

const allServices = { icon: AllServicesIcon, label: "Toutes les offres" };

const Choice = ({ icon, label, selected, onSelect }) => (
  <Box flexGrow={1} alignItems="stretch" onClick={onSelect} sx={{ cursor: 'pointer' }}>
    <Box align="center" mt={4} mb={2}>
      <SvgIcon htmlColor={selected ? '#FF96A0' : '#D3D3D3'} sx={{ width: 40, height: '100%', marginLeft: 2, marginRight: 2 }}>
        {React.createElement(icon)}
      </SvgIcon>
    </Box>
    <Box align="center">
      <Typography variant="body2" color={selected ? 'primary.main' : 'secondary.main'} align="center" sx={{ textTransform: 'lowercase', whiteSpace: 'pre-wrap', maxWidth: 150 }} >
        {label}
      </Typography>
    </Box>
  </Box>
);

const Filters = () => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'), { noSsr: true });
  const [openDrawer, setOpenDrawer] = useState(false);
  const { filterValues, setFilters } = useListContext();
  const [selected, setSelected] = useState(filterValues['cdlt:hasServiceType']);
  const select = useCallback(serviceUri => {
    setSelected(serviceUri);
    setFilters({ ...filterValues, 'cdlt:hasServiceType': serviceUri });
  }, [setSelected, setFilters, filterValues]);
  const selectedService = services.find(s => s.id === selected) || allServices;

  return xs ? (
    <>
      <Box display="flex" p={2} sx={{ bgColor: 'white' }} onClick={() => setOpenDrawer(true)}>
        <Box>
          <SvgIcon htmlColor="#FF96A0" sx={{ fontSize: 30, width: 24, marginRight: 2 }}>
            {React.createElement(selectedService.icon)}
          </SvgIcon>
        </Box>
        <Typography variant="body2" color="primary.main" sx={{ pt: "6px" }} >
          {selectedService.label.replace(/\n/g,' / ')}
        </Typography>
        <Box ml="auto">
          <AddIcon color="primary" sx={{ fontSize: 30 }} />
        </Box>
      </Box>
      <Drawer
        anchor="bottom"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box
          sx={{ width: 'auto' }}
          onClick={() => setOpenDrawer(false)}
          onKeyDown={() => setOpenDrawer(false)}
        >
          <List>
            {[allServices, ...services].map((service, i) => (
              <ListItem key={i} disablePadding>
                <ListItemButton onClick={() => select(service.id)} selected={selected === service.id}>
                  <ListItemIcon>
                    <SvgIcon htmlColor="#FF96A0" sx={{ fontSize: 30, width: 24, marginRight: 2 }}>
                      {React.createElement(service.icon)}
                    </SvgIcon>
                  </ListItemIcon>
                  <ListItemText primary={service.label.replace(/\n/g,' / ')} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
   ) : (
    <Wrapper display="flex" p={1} height={170}>
      <Choice 
        {...allServices}
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
    </Wrapper>
  );
};

const Wrapper = styled(Box)({
  backgroundColor: 'white',
  borderRadius: 5,
  position: 'absolute',
  bottom: -150,
  left: 0,
  right: 0,
  margin: 24
});

export default Filters;
