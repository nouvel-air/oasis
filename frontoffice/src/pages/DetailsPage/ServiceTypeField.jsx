import React from 'react';
import { useRecordContext } from 'react-admin';
import { SvgIcon, Tooltip } from '@mui/material';
import { iconsMapping, services } from '../../config/constants';

const ServiceTypeField = ({ source }) => {
  const record = useRecordContext();
  return (
    record && record[source] && 
      <Tooltip title={services.find(s => s.id === record[source])?.label} arrow>
        <SvgIcon htmlColor="#FF96A0" sx={{ width: 32, height: 32, position: 'absolute', top: 28, right: 28 }}>
          {React.createElement(iconsMapping[record[source]])}
        </SvgIcon>
      </Tooltip>
  )
};

export default ServiceTypeField;