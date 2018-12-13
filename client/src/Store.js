import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
import UserReducer from '../src/redux/UserReducer';

const Store = createStore(
    combineReducers({ UserReducer, }),
    compose(applyMiddleware(createLogger(), thunk, promise()))
);

export default Store;