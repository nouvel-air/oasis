import * as React from 'react';
import { AppBar, Layout } from 'react-admin';
import { UserMenu, useCheckAuthenticated } from "@semapps/auth-provider";

const MyAppBar = () => <AppBar userMenu={<UserMenu />} />;

const MyLayout = props => {
  useCheckAuthenticated();
  return <Layout {...props} appBar={MyAppBar} />;
};

export default MyLayout;
