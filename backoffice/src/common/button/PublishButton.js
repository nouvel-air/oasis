import React from 'react';
import { useNotify, useRecordContext, useResourceContext, useUpdate } from 'react-admin';
import { Button } from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import GetAppIcon from '@mui/icons-material/GetApp';
import { STATUS_PUBLISHED, STATUS_DRAFT } from '../../constants';

const PublishButton = () => {
  const record = useRecordContext();
  const resource = useResourceContext();
  const notify = useNotify();
  const [update] = useUpdate();

  const isPublished = record['cdlt:hasPublicationStatus'] === STATUS_PUBLISHED;

  const publish = e => {
    e.stopPropagation();
    update(resource, {
      id: record.id,
      data: { ...record, 'cdlt:hasPublicationStatus': STATUS_PUBLISHED },
      previousData: record
    });
    notify('La ressource a été publié');
  };

  const unpublish = e => {
    e.stopPropagation();
    update(resource, {
      id: record.id,
      data: { ...record, 'cdlt:hasPublicationStatus': STATUS_DRAFT },
      previousData: record
    });
    notify('La ressource a été dépublié');
  };

  return (
    <Button startIcon={isPublished ? <GetAppIcon /> : <PublishIcon />} onClick={isPublished ? unpublish : publish}>
      {isPublished ? 'Dépublier' : 'Publier'}
    </Button>
  );
};

export default PublishButton;
