import React from 'react';
import { Create, useRedirect } from 'react-admin';
import { useLocation } from 'react-router-dom';
import ServiceForm from './ServiceForm';

const ServiceCreate = () => {
  const location = useLocation();
  const redirect = useRedirect();
  const placeUri = location.state && location.state.record ? location.state.record['pair:offeredBy'] : undefined;

  const onSuccess = () => {
    if (placeUri) {
      redirect(`/Place/${encodeURIComponent(placeUri)}/1`);
    }
  };

  return (
    <Create mutationOptions={placeUri ? { onSuccess } : undefined} redirect={placeUri ? false : 'edit'}>
      <ServiceForm />
    </Create>
  );
}

export default ServiceCreate;
