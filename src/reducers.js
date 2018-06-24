import { combineReducers } from 'redux';
import { app } from './containers/App/redux';
import { game } from './containers/GamePage/redux';

export default function createReducer(injectedReducers) {
    return combineReducers({
        app,
        game,
        ...injectedReducers
    });
};