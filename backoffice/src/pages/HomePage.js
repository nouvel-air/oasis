import { useEffect } from 'react';
import { useRedirect } from 'react-admin';
import useAccountType from '../hooks/useAccountType';
import useOrganizationsTypes from '../hooks/useOrganizationsTypes';

/**
 * Redirect to the first page in the menu
 */
const HomePage = () => {
  const accountType = useAccountType();
  const organizationsTypes = useOrganizationsTypes();
  const redirect = useRedirect();

  useEffect(() => {
    if (accountType && organizationsTypes) {
      switch (accountType) {
        case 'admin':
          redirect('list', 'Place');
          break;

        case 'actor':
          if (organizationsTypes.includes('pair:Place')) {
            redirect('list', 'Place');
          } else if (organizationsTypes.includes('pair:Organization')) {
            redirect('list', 'Organization');
          }
          break;

        case 'agent':
        case 'member':
        default:
          redirect('list', 'OfferAndNeed');
          break;
      }
    }
  }, [accountType, organizationsTypes, redirect]);

  return null;
};

export default HomePage;
