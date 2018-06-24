import { push } from 'connected-react-router';
import { put, takeLatest } from 'redux-saga/effects';

export const JOIN_ROOM = 'JOIN_ROOM';

// ACTION CREATORS

export function joinRoom(roomCode) {
    return { type: JOIN_ROOM, payload: roomCode };
}

// SAGAS

export function* joinRoomSaga(action) {
    yield put(push(`/${action.payload}`));
};

export function* roomPageWatcherSaga() {
    yield takeLatest(JOIN_ROOM, joinRoomSaga);
}