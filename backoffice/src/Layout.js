import * as React from 'react';
import { AppBar, Layout, Menu } from 'react-admin';
import { UserMenu, useCheckAuthenticated } from "@semapps/auth-provider";
import useIsAdmin from './hooks/useIsAdmin';

const MyAppBar = () => <AppBar userMenu={<UserMenu />} />;

export const MyMenu = () => {
  const isAdmin = useIsAdmin();
  return isAdmin ? (
    <Menu>
      <Menu.ResourceItem name="Place" />
      <Menu.ResourceItem name="Service" />
      <Menu.ResourceItem name="Person" />
      <Menu.ResourceItem name="Type" />
      <Menu.ResourceItem name="Page" />
    </Menu>
  ) : (
    <Menu>
      <Menu.ResourceItem name="Place" />
      <Menu.ResourceItem name="Service" />
    </Menu>
  );
};

const MyLayout = props => {
  useCheckAuthenticated();
  return <Layout {...props} appBar={MyAppBar} menu={MyMenu} />;
};

export default MyLayout;
