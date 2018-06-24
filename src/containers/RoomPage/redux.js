import { push } from 'connected-react-router';
import { put, takeLatest, apply, call, fork, select, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { generateCode } from '../RoomPage/util';

let current_socket = null;

// SOCKETS

const createWebSocketConnection = () => {
    const socket = new WebSocket("wss://node2.wsninja.io");
    socket.addEventListener('open', (event) => {
        socket.send(JSON.stringify({ guid: '9106602f-555d-4850-8daa-c1079a76693f' }));
    });
    return socket;
}

const createSocketChannel = (socket) => {
    return eventChannel((emit) => {

        const messageHandler = (event) => {
            // puts event payload into the channel
            // this allows a Saga to take this payload from the returned channel
            const data = JSON.parse(event.data);
            emit(data);
        }

        // setup the subscription
        socket.addEventListener('message', messageHandler)

        // the subscriber must return an unsubscribe function
        // this will be invoked when the saga calls `channel.close` method
        const unsubscribe = () => {
            socket.removeEventListener('message', messageHandler)
        }

        return unsubscribe
    })
}

export function* watchSocket() {
    current_socket = yield call(createWebSocketConnection);
    const socketChannel = yield call(createSocketChannel, current_socket);

    while (true) {
        const payload = yield take(socketChannel);
        const state = yield select();
        const roomCode = state.app.roomCode;
        if (payload.roomCode === roomCode) {
            yield put(payload.action);
        }
    }
}

// ACTIONS

export const JOIN_ROOM = 'JOIN_ROOM';
export const CREATE_ROOM = 'CREATE_ROOM';
export const SET_CURRENT_ROOM = 'SET_CURRENT_ROOM';

// ACTION CREATORS

export function setCurrentRoom(roomCode) {
    return { type: SET_CURRENT_ROOM, payload: roomCode };
}

export function joinRoom(roomCode) {
    return { type: JOIN_ROOM, payload: roomCode };
}

export function createRoom() {
    return { type: CREATE_ROOM, payload: generateCode() };
}

// SAGAS

export function* joinRoomSaga(action) {
    yield put(push(`/${action.payload}`));
    yield fork(memeActionSaga, current_socket, action.payload);
};

function* memeActionSaga(socket, roomCode) {
    yield apply(socket, socket.send, [
        JSON.stringify({roomCode, action: { type: 'MEME_ACTION' }})
    ]);
}

export function* roomPageWatcherSaga() {
    yield takeLatest(JOIN_ROOM, joinRoomSaga);
    yield takeLatest(CREATE_ROOM, joinRoomSaga);
    yield watchSocket();
}