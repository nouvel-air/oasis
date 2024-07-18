import { useGetIdentity } from 'react-admin';

const getSlugFromUri = str => str?.match(new RegExp(`.*/(.*)`))[1];

// Return admin, agent, actor or member
const useAccountType = () => {
  const { identity } = useGetIdentity();
  return getSlugFromUri(identity?.webIdData?.['pair:hasType']);
};

export default useAccountType;
