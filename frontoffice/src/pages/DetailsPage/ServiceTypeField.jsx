import React from 'react';
import { useRecordContext } from 'react-admin';
import { SvgIcon, Tooltip, useMediaQuery } from '@mui/material';
import { iconsMapping, services } from '../../config/constants';

const ServiceTypeField = ({ source }) => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'), { noSsr: true });
  const record = useRecordContext();
  return (
    record && record[source] && 
      <Tooltip title={services.find(s => s.id === record[source])?.label} arrow>
        <SvgIcon htmlColor="#FF96A0" sx={{ width: xs ? 28 : 32, height: xs ? 28 : 32, position: 'absolute', top: xs ? 16 : 28, right: xs ? 16 : 28 }}>
          {React.createElement(iconsMapping[record[source]])}
        </SvgIcon>
      </Tooltip>
  )
};

export default ServiceTypeField;