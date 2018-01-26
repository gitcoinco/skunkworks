import { applyMiddleware, createStore } from 'redux';

import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import reducers from './reducers';
export const history = createHistory();

let middleware = [ promise(), thunk, routerMiddleware(history) ];
if (process.env.NODE_ENV !== 'production') {
    middleware = [ ...middleware, createLogger() ];
}

export default createStore(reducers, applyMiddleware(...middleware));
