import { createStore, applyMiddleware } from 'redux';
import Reducer from './Reducer';
import Thunk from 'redux-thunk';

export const Store = createStore(Reducer, applyMiddleware(Thunk));