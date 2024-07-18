import { useEffect } from 'react';
import { useGetIdentity, useDataProvider } from 'react-admin';
import { arrayOf } from '../utils';
import { useState } from 'react';

const useOrganizationsTypes = () => {
  const [organizationsTypes, setOrganizationsTypes] = useState([]);
  const { identity } = useGetIdentity();
  const dataProvider = useDataProvider();

  useEffect(() => {
    (async () => {
      const { data } = await dataProvider.getMany('OrganizationOrPlace', {
        ids: arrayOf(identity?.webIdData?.['pair:affiliatedBy'])
      });
      setOrganizationsTypes([...new Set(data.map(o => o.type))]);
    })();
  }, [identity, dataProvider, setOrganizationsTypes]);

  return organizationsTypes;
};

export default useOrganizationsTypes;
