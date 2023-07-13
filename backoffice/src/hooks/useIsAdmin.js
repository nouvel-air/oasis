import urlJoin from 'url-join';
import { useGetIdentity } from 'react-admin';

const useIsAdmin = () => {
  const { identity } = useGetIdentity();
  return identity?.webIdData?.['pair:hasType'] === urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, 'types', 'admin');
};

export default useIsAdmin;
