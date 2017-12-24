import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store, { history } from './store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const app = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  app,
);

registerServiceWorker();
