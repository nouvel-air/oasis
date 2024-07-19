import React from 'react';
import { useRecordContext } from 'react-admin';
import { Link } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  }
}));

const AddOfferAndNeedButton = () => {
  const record = useRecordContext();
  const classes = useStyles();
  return (
    <Link to="/OfferAndNeed/create" state={{ record: { 'pair:offeredBy': record.id } }}>
      <Button startIcon={<AddIcon />} className={classes.button}>
        Ajouter une annonce
      </Button>
    </Link>
  );
};

export default AddOfferAndNeedButton;
