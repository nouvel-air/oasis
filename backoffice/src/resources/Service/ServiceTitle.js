import React from 'react';
import { useRecordContext } from 'react-admin';

const ServiceTitle = () => {
  const record = useRecordContext();
  return <span>{record?.['pair:label']}</span>;
};

export default ServiceTitle;
