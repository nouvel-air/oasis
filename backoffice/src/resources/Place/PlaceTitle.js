import React from 'react';
import { useRecordContext } from 'react-admin';

const PlaceTitle = () => {
  const record = useRecordContext();
  return <span>{record?.['pair:label']}</span>;
};

export default PlaceTitle;
