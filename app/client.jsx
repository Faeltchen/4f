import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createRoutes from './routes';
import * as types from './types';
import configureStore from './store/configureStore';

import App from './containers/App';

import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import Common from "./scss/common";

import AuthService from './utils/AuthService';
const auth = new AuthService('ADBPcMnmiCtR4gxu1B3H5GtEz9Ht9xtO', '4fickr.eu.auth0.com');

const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store, auth);



function onUpdate() {
  // Prevent duplicate fetches when first loaded.
  // Explanation: On server-side render, we already have __INITIAL_STATE__
  // So when the client side onUpdate kicks in, we do not need to fetch twice.
  // We set it to null so that every subsequent client-side navigation will
  // still trigger a fetch data.
  // Read more: https://github.com/choonkending/react-webpack-node/pull/203#discussion_r60839356
  if (window.__INITIAL_STATE__ !== null) {
    window.__INITIAL_STATE__ = null;
    return;
  }

  store.dispatch({ type: types.CREATE_REQUEST });
  preRenderMiddleware(this.state)
  .then(data => {
    return store.dispatch({ type: types.REQUEST_SUCCESS, data });
  });
}

/**
 * Callback function handling frontend route changes.
 */

// Router converts <Route> element hierarchy to a route config:
// Read more https://github.com/rackt/react-router/blob/latest/docs/Glossary.md#routeconfig
/*

render(
  <Provider store={store}>
    <App AuthService={auth}/>
  </Provider>, document.getElementById('app')
);
*/
  render(
    <Provider store={store}>
      <Router history={history} onUpdate={onUpdate} auth={auth}>
        {routes}
      </Router>
    </Provider>, document.getElementById('app')
  );
