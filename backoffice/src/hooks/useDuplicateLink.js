import { useRecordContext, useResourceContext, useCreatePath } from 'react-admin';
import { stringify } from 'query-string';

const cleanRecord = ({ 
  id, 
  type,
  '@context': context,
  'dc:created': created,
  'dc:modified': modified,
  'dc:creator': creator,
  'cdlt:exportedTo': exportedTo,
  'cdlt:hasPublicationStatus': publicationStatus, 
  'cdlt:paymentAccepted': paymentAccepted, 
  'cdlt:publishOnEcovillageGlobal': publishOnEcovillageGlobal, 
  ...rest 
}) => rest;

const useDuplicateLink = () => {
  const record = useRecordContext();
  const resource = useResourceContext();
  const createPath = useCreatePath();
  const pathname = createPath({ resource, type: 'create' });

  return {
    pathname,
    search: stringify({
      source: JSON.stringify(cleanRecord(record)),
    }),
  };
}

export default useDuplicateLink;
