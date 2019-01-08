import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';

import CssBaseline from '@material-ui/core/CssBaseline';

import LoginPage from './components/pages/LoginPage';
import HomePage from './components/pages/HomePage';

import { authenticatedWrapper, notAuthenticatedWrapper } from './auth/Auth';

const App = ({ store, persistor }) => (
  <Provider store={store}>
    <CssBaseline />
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={authenticatedWrapper(HomePage)} />
          <Route path="/login" component={notAuthenticatedWrapper(LoginPage)} />
          <Redirect to="/home" />
        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default App;
