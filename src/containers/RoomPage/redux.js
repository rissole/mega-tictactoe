import { push } from 'connected-react-router';
import { put, takeLatest } from 'redux-saga/effects';

import { generateCode } from '../RoomPage/util';

// ACTIONS

export const JOIN_ROOM = 'JOIN_ROOM';
export const CREATE_ROOM = 'CREATE_ROOM';

// ACTION CREATORS

export function joinRoom(roomCode) {
    return { type: JOIN_ROOM, payload: roomCode };
}

export function createRoom() {
    return { type: CREATE_ROOM, payload: generateCode() };
}

// SAGAS

export function* joinRoomSaga(action) {
    yield put(push(`/${action.payload}`));
};

export function* roomPageWatcherSaga() {
    yield takeLatest(JOIN_ROOM, joinRoomSaga);
    yield takeLatest(CREATE_ROOM, joinRoomSaga);
}