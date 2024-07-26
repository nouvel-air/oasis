import React from 'react';
import { Create, SimpleForm } from 'react-admin';
// import { useRedirect } from 'react-admin';
// import { useLocation } from 'react-router-dom';
import ServiceForm from './ServiceForm';

const ServiceCreate = () => {
  // const location = useLocation();
  // const redirect = useRedirect();
  // const placeUri = location.state && location.state.record ? location.state.record['pair:offeredBy'] : undefined;

  // const onSuccess = () => {
  //   if (placeUri) {
  //     // Set refresh to true, so that the place data are refreshed with the updated services types (done on PlaceEdit)
  //     redirect(`/Place/${encodeURIComponent(placeUri)}/1`, 'Place', placeUri, {}, { refresh: true });
  //   }
  // };

  return (
    <Create
      mutationOptions={/*placeUri ? { onSuccess } :*/ undefined}
      redirect={/*placeUri ? false : 'edit'*/ undefined}
    >
      <SimpleForm warnWhenUnsavedChanges>
        <ServiceForm />
      </SimpleForm>
    </Create>
  );
};

export default ServiceCreate;
