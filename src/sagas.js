import { all } from 'redux-saga/effects';
import { roomPageWatcherSaga } from './containers/RoomPage/redux';
import { gamePageWatcherSaga } from './containers/GamePage/redux';

export default function* rootSaga() {
    yield all([
        roomPageWatcherSaga(),
        gamePageWatcherSaga()
    ])
}