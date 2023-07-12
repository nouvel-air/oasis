import React from 'react';
import { useRecordContext } from 'react-admin';
import { SvgIcon, Box, Tooltip, useMediaQuery } from '@mui/material';
import { iconsMapping, services } from '../../config/constants';

const defaultToArray = value => (!value ? [] : Array.isArray(value) ? value : [value])

const ServiceIcons = ({ source }) => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'), { noSsr: true });
  const record = useRecordContext();
  return (
    <Box display="flex">
      {record && record[source] && defaultToArray(record[source]).filter(typeUri => Object.keys(iconsMapping).includes(typeUri)).map(typeUri => (
        <Tooltip key={typeUri} title={services.find(s => s.id === typeUri)?.label} arrow disableFocusListener placement="top">
          <Box mr={{ xs: 1, sm: 0 }} ml={{ sm: 1 }} sx={{ borderRadius: '50%', backgroundColor: '#F6F6F6', height: xs ? 45 : 60, width: xs ? 45 : 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SvgIcon htmlColor="#FF96A0" sx={{ width: xs ? 24 : 32, height: '100%', marginTop: '-2px' }}>
              {React.createElement(iconsMapping[typeUri])}
            </SvgIcon>
          </Box>
        </Tooltip>
      ))}
    </Box>
  )
};

export default ServiceIcons;
