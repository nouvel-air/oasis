import React from 'react';
import { Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TopLink = ({ icon, children, align = "left", iconColor = 'white', labelColor = 'white' }) => {
  const iconStyle = { marginRight: 10, position: 'relative', top: 5, height: 26 };
  if (align === 'left') iconStyle.marginRight = 10;
  if (align === 'right') iconStyle.marginLeft = 10;
  const faIcon = <FontAwesomeIcon icon={icon} color={iconColor} style={iconStyle} />;
  return (
    <Typography color={labelColor} variant="body2" align={align} mb={1}>
      {align === "left" && faIcon}
      {children}
      {align === "right" && faIcon}
    </Typography>
  )
}

export default TopLink;
