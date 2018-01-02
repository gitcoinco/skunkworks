import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store, { history } from './store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const app = document.getElementById('root');

history.listen(location => {
  if (typeof window.ga === 'function') {
    window.ga('set', 'page', location.pathname + location.search);
    window.ga('send', 'pageview');
  }
  return null;
});

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  app,
);

registerServiceWorker();
