import React, { useEffect } from 'react';
import { Admin, Resource, memoryStore, CustomRoutes } from 'react-admin';
import { BrowserRouter } from 'react-router-dom';
import { LocalLoginPage } from '@semapps/auth-provider';
import { Route } from "react-router-dom";

import i18nProvider from './config/i18nProvider';
import authProvider from './config/authProvider';
import dataProvider from './config/dataProvider';
import theme from './config/theme';
import HomePage from './pages/HomePage/HomePage';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import CustomPage from './pages/CustomPage/CustomPage';

const LoginPage = () => <LocalLoginPage hasSignup={false} />

const App = () => (
  <BrowserRouter>
    <Admin
      disableTelemetry
      title="Destination Oasis"
      authProvider={authProvider}
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      theme={theme}
      loginPage={LoginPage}
      store={memoryStore()}
    >
      <CustomRoutes noLayout>
        <Route path="/" element={<HomePage />} />
        <Route path="/lieux/:slug" element={<DetailsPage />} />
        <Route path="/pages/:slug" element={<CustomPage />} />
      </CustomRoutes>
      <Resource name="Page" />
      <Resource name="Person" />
      <Resource name="Place" />
      <Resource name="Region" />
      <Resource name="Service" />
      <Resource name="Status" />
      <Resource name="Type" />
    </Admin>
  </BrowserRouter>
);

export default App;
