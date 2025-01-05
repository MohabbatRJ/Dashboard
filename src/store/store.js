// store/store.js

import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import * as reduxThunk from 'redux-thunk';
const thunk = reduxThunk.default || reduxThunk.thunk;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) : 
    compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
