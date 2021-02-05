import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import theme from 'theme';
import './assets/scss/index.scss';
import Routes from './Routes';
import {
  RestaurantProvider,
  PromptToInstallProvider,
  MenuProvider,
  CartProvider,
  LocationProvider
} from 'context';
import { CssBaseline } from '@material-ui/core';

const browserHistory = createBrowserHistory();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PromptToInstallProvider>
        <RestaurantProvider>
          <LocationProvider>
            <CartProvider>
              <MenuProvider>
                <Router history={browserHistory}>
                  <Routes />
                </Router>
              </MenuProvider>
            </CartProvider>
          </LocationProvider>
        </RestaurantProvider>
      </PromptToInstallProvider>
    </ThemeProvider>
  );
};

export default App;
