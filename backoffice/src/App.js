import React from 'react';
import { Admin, Resource, memoryStore } from 'react-admin';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { LocalLoginPage } from '@semapps/auth-provider';

import i18nProvider from './config/i18nProvider';
import authProvider from './config/authProvider';
import dataProvider from './config/dataProvider';
import theme from './config/theme';
import * as resources from './resources';
import Layout from './Layout';

const LoginPage = () => <LocalLoginPage hasSignup={false} />

const App = () => (
  <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Admin
          disableTelemetry
          title="Coopéreative Oasis"
          authProvider={authProvider}
          dataProvider={dataProvider}
          i18nProvider={i18nProvider}
          layout={Layout}
          theme={theme}
          loginPage={LoginPage}
          store={memoryStore()}
        >
          {Object.entries(resources).map(([key, resource]) => (
            <Resource key={key} name={key} {...resource.config} />
          ))}
        </Admin>
      </ThemeProvider> 
    </BrowserRouter>
  </StyledEngineProvider>
);

export default App;
