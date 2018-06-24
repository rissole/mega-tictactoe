import { all } from 'redux-saga/effects';
import { roomPageWatcherSaga } from './containers/RoomPage/redux';

export default function* rootSaga() {
    yield all([
        roomPageWatcherSaga(),
    ])
}