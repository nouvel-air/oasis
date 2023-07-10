import React from 'react';
import { useRecordContext } from 'react-admin';
import { SvgIcon } from '@mui/material';
import { iconsMapping } from '../../config/constants';

const ServiceTypeField = ({ source }) => {
  const record = useRecordContext();
  return (
    record && record[source] && 
      <SvgIcon htmlColor="#FF96A0" sx={{ width: 32, height: 32, position: 'absolute', top: 28, right: 28 }}>
        {React.createElement(iconsMapping[record[source]])}
      </SvgIcon>
  )
};

export default ServiceTypeField;