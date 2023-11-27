import React from 'react';
import { Admin, Resource, memoryStore, CustomRoutes } from 'react-admin';
import { QueryClient } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { LocalLoginPage } from '@semapps/auth-provider';
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react';
import { Route } from "react-router-dom";

import i18nProvider from './config/i18nProvider';
import authProvider from './config/authProvider';
import dataProvider from './config/dataProvider';
import theme from './config/theme';
import Layout from './layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import CustomPage from './pages/CustomPage/CustomPage';

const LoginPage = () => <LocalLoginPage hasSignup={false} />

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    },
  },
});

const matomoInstance = createInstance({
  urlBase: 'https://stats.colibris-outilslibres.org/',
  siteId: 43,
  disabled: process.env.NODE_ENV !== 'production'
});

const App = () => (
  <MatomoProvider value={matomoInstance}>
    <BrowserRouter>
      <Admin
        disableTelemetry
        title="Destination Oasis"
        authProvider={authProvider}
        dataProvider={dataProvider}
        i18nProvider={i18nProvider}
        layout={Layout}
        theme={theme}
        loginPage={LoginPage}
        store={memoryStore()}
        queryClient={queryClient}
      >
        <CustomRoutes>
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
  </MatomoProvider>
);

export default App;
