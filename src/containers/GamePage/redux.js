import { fromJS } from 'immutable';
import { CREATE_ROOM } from '../RoomPage/redux';
import { put, call, select, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

// ACTIONS

const PLAY_MOVE = 'PLAY_MOVE';
const GET_GAME_STATE = {
    FETCH: 'GET_GAME_STATE.FETCH',
    SUCCESS: 'GET_GAME_STATE.SUCCESS',
    ERROR: 'GET_GAME_STATE.ERROR'
};

// ACTION CREATORS

export function playMove(subGameIndex, position, mark) {
    return { type: PLAY_MOVE, payload: { subGameIndex, position, mark } };
}

export function getGameState(roomCode) {
    return { type: GET_GAME_STATE.FETCH, payload: roomCode };
}

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

// SAGAS

// function* memeActionSaga(socket, roomCode) {
//     yield apply(socket, socket.send, [
//         JSON.stringify({roomCode, action: { type: 'MEME_ACTION' }})
//     ]);
// }

export function* gamePageWatcherSaga() {
    const socket = yield call(createWebSocketConnection);
    const socketChannel = yield call(createSocketChannel, socket);

    while (true) {
        const payload = yield take(socketChannel);
        const state = yield select();
        const roomCode = state.app.roomCode;
        if (payload.roomCode === roomCode) {
            yield put(payload.action);
        }
    }
}

// REDUCER

const initialState = fromJS({
    board: [
        [], [], [],
        [], [], [],
        [], [], []
    ],
    restrictedSubgame: null,
    turnPlayer: 'x',
    isInitialized: false
});

const isMoveValid = (currentState, subGameIndex, position, mark) => {
    return mark === currentState.get('turnPlayer')
        && currentState.getIn(['board', subGameIndex, position], null) === null
}

export function game(state = initialState, action) {
    switch (action.type) {
        case PLAY_MOVE:
            const { subGameIndex, position, mark } = action.payload;
            if (isMoveValid(state, subGameIndex, position, mark)) {    
                state = state.setIn(['board', subGameIndex, position], mark);
                return state.merge({
                    restrictedSubgame: position,
                    turnPlayer: mark === 'o' ? 'x' : 'o'
                });
            } else {
                // fire an error i guess
                console.log('illegal move', action.payload);
                return state;
            }
        case CREATE_ROOM:
            return state.merge({isInitialized: true});
        case GET_GAME_STATE.SUCCESS:
            return state.merge({
                board: action.payload.board,
                restrictedSubgame: action.payload.restrictedSubgame,
                turnPlayer: action.payload.turnPlayer,
                isInitialized: true
            });
        default:
            return state;
    }
}