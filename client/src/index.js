import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import createAPI from './services/api';
import { requireAuthorization } from './store/action';
// import { checkAuth } from './store/api-actions';
import { AuthorizationStatus } from './const';
import rootReducer from './store/root-reducer';
// import { Router as BrowserRouter } from 'react-router-dom';
import App from './components/app/App';
import redirect from './store/middlewares/redirect';
// import { Router as BrowserRouter } from 'react-router-dom';
// import browserHistory from './browser-history';
import { checkAuth } from './store/api-actions';
import './index.scss';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

const data = localStorage.getItem('userData');
store.dispatch(checkAuth(data));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App store={store} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
