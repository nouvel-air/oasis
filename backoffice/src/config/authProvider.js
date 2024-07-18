import urlJoin from 'url-join';
import { authProvider } from '@semapps/auth-provider';
import dataProvider from './dataProvider';
import { arrayOf } from '../utils';

const STATUS_EMAIL_NOT_VERIFIED = urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, 'status', 'email-not-verified');
const STATUS_MEMBERSHIP_NOT_VERIFIED = urlJoin(
  process.env.REACT_APP_MIDDLEWARE_URL,
  'status',
  'membership-not-verified'
);

export default authProvider({
  dataProvider,
  authType: 'local',
  // allowAnonymous: false,
  checkPermissions: true,
  // Block access to users who don't have a verified email or membership
  checkUser: userData => {
    if (arrayOf(userData['pair:hasStatus']).includes(STATUS_EMAIL_NOT_VERIFIED)) {
      // If the error message change, it must be changed on the SignupForm as well
      throw new Error("Votre adresse mail n'est pas vérifiée. Veuillez cliquer sur le lien envoyé par mail.");
    }
    if (arrayOf(userData['pair:hasStatus']).includes(STATUS_MEMBERSHIP_NOT_VERIFIED)) {
      // If the error message change, it must be changed on the SignupForm as well
      throw new Error("Votre compte n'est pas activé. Veuillez attendre la confirmation par email.");
    }
  }
});
