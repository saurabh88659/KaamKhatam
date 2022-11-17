import {createStore, combineReducers, applyMiddleware} from 'reddux';
import thunk from 'react-redux';
import userReducer from './reducers';

const rootReducer = combineReducers({userReducer});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
