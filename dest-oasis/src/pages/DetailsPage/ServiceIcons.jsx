import React from 'react';
import { useRecordContext } from 'react-admin';
import { SvgIcon, Box } from '@mui/material';
import { iconsMapping } from '../../config/constants';

const defaultToArray = value => (!value ? [] : Array.isArray(value) ? value : [value])

const ServiceIcons = ({ source }) => {
  const record = useRecordContext();
  return (
    <Box display="flex">
      {record && record[source] && defaultToArray(record[source]).filter(typeUri => Object.keys(iconsMapping).includes(typeUri)).map(typeUri => (
        <Box key={typeUri} ml={1} sx={{ borderRadius: '50%', backgroundColor: '#F6F6F6', height: 60, width: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SvgIcon htmlColor="#FF96A0" sx={{ width: 32, height: '100%', marginTop: '-2px' }}>
            {React.createElement(iconsMapping[typeUri])}
          </SvgIcon>
        </Box>
      ))}
    </Box>
  )
};

export default ServiceIcons;
