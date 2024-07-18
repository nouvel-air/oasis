import * as React from 'react';
import { AppBar, Layout, Menu } from 'react-admin';
import { UserMenu, useCheckAuthenticated } from '@semapps/auth-provider';
import useAccountType from './hooks/useAccountType';
import useOrganizationsTypes from './hooks/useOrganizationsTypes';

const MyAppBar = () => <AppBar userMenu={<UserMenu />} />;

export const MyMenu = () => {
  const accountType = useAccountType();
  const organizationsTypes = useOrganizationsTypes();
  return accountType === 'admin' ? (
    <Menu>
      <Menu.ResourceItem name="Place" />
      <Menu.ResourceItem name="Service" />
      <Menu.ResourceItem name="Person" />
      <Menu.ResourceItem name="Organization" />
      <Menu.ResourceItem name="Type" />
      <Menu.ResourceItem name="Page" />
    </Menu>
  ) : (
    <Menu>
      {organizationsTypes.includes('pair:Place') && <Menu.ResourceItem name="Place" />}
      {organizationsTypes.includes('pair:Place') && <Menu.ResourceItem name="Service" />}
      {organizationsTypes.includes('pair:Organization') && <Menu.ResourceItem name="Organization" />}
      <Menu.ResourceItem name="Person" />
    </Menu>
  );
};

const MyLayout = props => {
  useCheckAuthenticated();
  return <Layout {...props} appBar={MyAppBar} menu={MyMenu} />;
};

export default MyLayout;
