import * as React from 'react';
import { AppBar, Layout } from 'react-admin';
import { UserMenu } from "@semapps/auth-provider";

const MyAppBar = () => <AppBar userMenu={<UserMenu />} />;

const MyLayout = props => <Layout {...props} appBar={MyAppBar} />;

export default MyLayout;
