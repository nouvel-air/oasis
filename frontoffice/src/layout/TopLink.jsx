import React from 'react';
import { Link } from 'react-admin';
import { Typography, useMediaQuery } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TopLink = ({ icon, to, target, children, align = "left", iconColor = 'white', labelColor = 'white' }) => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'), { noSsr: true });
  const iconStyle = { marginRight: xs ? 0 : 10, position: 'relative', top: xs ? 2 : 5, height: xs ? 14 : 26 };
  if (align === 'left') iconStyle.marginRight = xs ? 5 : 10;
  if (align === 'right') iconStyle.marginLeft = xs ? 5 : 10;
  const faIcon = <FontAwesomeIcon icon={icon} color={iconColor} style={iconStyle} />;
  return (
    <Link to={to} target={target}>
      <Typography color={labelColor} variant="body2" align={align} mb={1} fontSize={xs ? 10 : undefined}>
        {align === "left" && faIcon}
        {children}
        {align === "right" && faIcon}
      </Typography>
    </Link>
  )
}

export default TopLink;
