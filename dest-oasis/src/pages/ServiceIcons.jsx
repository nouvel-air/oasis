import React from 'react';
import { useRecordContext } from 'react-admin';
import { SvgIcon } from '@mui/material';
import { ReactComponent as CampingIcon } from '../assets/camping_blanc.svg';
import { ReactComponent as InsoliteIcon } from '../assets/insolite_blanc.svg';
import { ReactComponent as GiteIcon } from '../assets/gite_blanc.svg';
import { ReactComponent as HoteIcon } from '../assets/hote_blanc.svg';
import { ReactComponent as SalleIcon } from '../assets/salle_blanc.svg';

const defaultToArray = value => (!value ? [] : Array.isArray(value) ? value : [value])

const iconsMapping = {
  [import.meta.env.VITE_APP_MIDDLEWARE_URL + 'types/chambres-d-hotes-tables-d-hotes']: HoteIcon,
  [import.meta.env.VITE_APP_MIDDLEWARE_URL + 'types/hebergements-insolites']: InsoliteIcon,
  [import.meta.env.VITE_APP_MIDDLEWARE_URL + 'types/gites']: GiteIcon,
  [import.meta.env.VITE_APP_MIDDLEWARE_URL + 'types/camping']: CampingIcon,
  [import.meta.env.VITE_APP_MIDDLEWARE_URL + 'types/accueil-de-stages-salles']: SalleIcon,
};

const ServiceIcons = ({ source }) => {
  const record = useRecordContext();
  return (
    record && record[source] && defaultToArray(record[source]).filter(typeUri => Object.keys(iconsMapping).includes(typeUri)).map(typeUri => (
      <SvgIcon sx={{ width: 20 }} key={typeUri}>
        {React.createElement(iconsMapping[typeUri])}
      </SvgIcon>
    ))
  )
};

export default ServiceIcons;
