import urlJoin from 'url-join';
import { authProvider } from '@semapps/auth-provider';
import dataProvider from './dataProvider';
import { arrayOf } from '../utils';

const STATUS_EMAIL_NOT_VERIFIED = urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, 'status', 'email-verified');
const STATUS_MEMBERSHIP_NOT_VERIFIED = urlJoin(CONFIG.HOME_URL, 'types', 'agent');

export default authProvider({
  dataProvider,
  authType: 'local',
  // allowAnonymous: false,
  checkPermissions: true,
  // Block access to users who don't have a verified email or membership
  checkUser: userData =>
    !arrayOf(userData['pair:hasStatus']).some(
      s => s === STATUS_EMAIL_NOT_VERIFIED || s === STATUS_MEMBERSHIP_NOT_VERIFIED
    )
});
