import React from "react";
import { Box } from '@mui/material';

const Separator = (props) => (
  <Box sx={{ width: { xs: 50, md: 80 }, height: { xs: 5, md: 10 }, backgroundColor: 'primary.main' }} {...props} />
);

export default Separator;
