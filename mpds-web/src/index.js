import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import multi from 'redux-multi';
import thunk from 'redux-thunk';
// import LoadingBar from "react-redux-loading-bar";
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import LinearProgress from '@material-ui/core/LinearProgress';

import './index.css';
import App from './App';
// import i18n (needs to be bundled ;))
import './i18n';
import logo from './utils/logo_MPDS.svg';
import reducers from './store/reducers';

// imports of style/design libraries
/* import 'bootstrap/dist/css/bootstrap.min.css';
 */
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './utils/themes';

// loading component for suspense fallback
const Loader = () => (
  <div className='App'>
    <LinearProgress />
  </div>
);

/**
 * Código para permitir o uso da extensão redux devTools no browser.
 * Caso seja para desativar esta extensão é só comentar o conjunto de instruções
 * seguinte e "descomentar" o bloco de instruções a seguir a este.
 */
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  /* preloadedState, */ composeEnhancers(
    applyMiddleware(
      // reportAction,
      thunk,
      multi,
      promise,
      loadingBarMiddleware()
    )
  )
);
/**
 * Bloco a descomentar caso seja para remover o acesso da extensão à store
 */
// const store = applyMiddleware(
//   thunk,
//   multi,
//   promise,
//   loadingBarMiddleware()
// )(createStore)(reducers);

ReactDOM.render(
  // here app catches the suspense from page in case translations are not yet loaded
  
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Suspense fallback={<Loader />}>
        {/* <LoadingBar style={{ backgroundColor: "blue", height: "5px" }} /> */}
        <App />
        </Suspense>
      </MuiThemeProvider>
    </Provider>
  ,

  document.getElementById('root')
);
