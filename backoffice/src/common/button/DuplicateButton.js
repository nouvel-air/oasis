import React from 'react';
import { Button } from '@mui/material';
import QueueIcon from '@mui/icons-material/Queue';
import useDuplicateLink from '../../hooks/useDuplicateLink';


const DuplicateButton = (props) => {
  const duplicateLink = useDuplicateLink();

  return (
    <Button 
      {...props}
      startIcon={<QueueIcon />} 
      to={duplicateLink}
      state={{ _scrollToTop: true }}    
    >
      Dupliquer
    </Button>
  );
};

export default DuplicateButton;
