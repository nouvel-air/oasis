import React from 'react';
import { useRecordContext } from 'react-admin';
import { SvgIcon } from '@mui/material';
import { iconsMapping } from '../../config/constants';

const defaultToArray = value => (!value ? [] : Array.isArray(value) ? value : [value])

const ServiceIcons = ({ source }) => {
  const record = useRecordContext();
  return (
    record && record[source] && defaultToArray(record[source]).filter(typeUri => Object.keys(iconsMapping).includes(typeUri)).map(typeUri => (
      <SvgIcon htmlColor="white" sx={{ width: 20, marginLeft: 2, marginRight: 2 }} key={typeUri}>
        {React.createElement(iconsMapping[typeUri])}
      </SvgIcon>
    ))
  )
};

export default ServiceIcons;
