import { authProvider } from '@semapps/auth-provider';
import dataProvider from './dataProvider';

export default authProvider({
  dataProvider,
  localAccounts: true,
  // allowAnonymous: false,
  // checkPermissions: true
});
