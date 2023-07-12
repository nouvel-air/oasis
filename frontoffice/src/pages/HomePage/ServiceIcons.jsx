import React from 'react';
import { useRecordContext } from 'react-admin';
import { SvgIcon, Tooltip } from '@mui/material';
import { iconsMapping, services } from '../../config/constants';

const defaultToArray = value => (!value ? [] : Array.isArray(value) ? value : [value])

const ServiceIcons = ({ source }) => {
  const record = useRecordContext();
  return (
    record && record[source] && defaultToArray(record[source]).filter(typeUri => Object.keys(iconsMapping).includes(typeUri)).map(typeUri => (
      <Tooltip key={typeUri} title={services.find(s => s.id === typeUri)?.label} arrow placement="top">
        <SvgIcon htmlColor="white" sx={{ width: 20, marginLeft: 2, marginRight: 2 }}>
          {React.createElement(iconsMapping[typeUri])}
        </SvgIcon>
      </Tooltip>
    ))
  )
};

export default ServiceIcons;
