import { useMemo } from 'react';
import { useGetIdentity } from 'react-admin';

const getSlugFromUri = str => str?.match(new RegExp(`.*/(.*)`))[1];

// Return admin, agent, actor or member
const useAccountType = () => {
  const { data: identity } = useGetIdentity();
  return useMemo(() => getSlugFromUri(identity?.webIdData?.['pair:hasType']), [identity]);
};

export default useAccountType;
