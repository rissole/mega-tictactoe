import { combineReducers } from 'redux';
import { app } from './containers/App/redux';

export default function createReducer(injectedReducers) {
    return combineReducers({
        app,
        ...injectedReducers
    });
};