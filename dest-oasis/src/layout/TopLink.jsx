import React from 'react';
import { Link } from 'react-admin';
import { Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TopLink = ({ icon, to, target, children, align = "left", iconColor = 'white', labelColor = 'white' }) => {
  const iconStyle = { marginRight: 10, position: 'relative', top: 5, height: 26 };
  if (align === 'left') iconStyle.marginRight = 10;
  if (align === 'right') iconStyle.marginLeft = 10;
  const faIcon = <FontAwesomeIcon icon={icon} color={iconColor} style={iconStyle} />;
  return (
    <Link to={to} target={target}>
      <Typography color={labelColor} variant="body2" align={align} mb={1}>
        {align === "left" && faIcon}
        {children}
        {align === "right" && faIcon}
      </Typography>
    </Link>
  )
}

export default TopLink;
