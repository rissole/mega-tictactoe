import { fromJS } from 'immutable';
import { CREATE_ROOM } from '../RoomPage/redux';
import { put, call, select, take, all, apply, race } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { findWinner } from '../../components/GameBoard/util';

// ACTIONS

export const PLAY_MOVE = 'PLAY_MOVE';
export const GET_GAME_STATE = {
    FETCH: 'GET_GAME_STATE.FETCH',
    SUCCESS: 'GET_GAME_STATE.SUCCESS',
    ERROR: 'GET_GAME_STATE.ERROR'
};
export const SEND_GAME_STATE = 'SEND_GAME_STATE';
export const RESET_GAME = 'RESET_GAME';

// ACTION CREATORS

export function playMove(subGameIndex, position, mark) {
    return { type: PLAY_MOVE, payload: { subGameIndex, position, mark } };
}

export function getGameState(roomCode) {
    return { type: GET_GAME_STATE.FETCH, payload: roomCode };
}

export function resetGame() {
    return { type: RESET_GAME };
}

// SOCKETS

function createWebSocketConnection() {
    return new Promise(resolve => {
        const socket = new WebSocket("wss://node2.wsninja.io");
        socket.addEventListener('open', (event) => {
            socket.send(JSON.stringify({ guid: '9106602f-555d-4850-8daa-c1079a76693f' }));
            resolve(socket);
        });
    });
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

// When we see a certain action, what message do we send?
const createMessageForAction = (state, action) => {
    if (action.type === PLAY_MOVE && action.payload.mark === state.app.playerMark) {
        return action;
    }
    if (action.type === GET_GAME_STATE.FETCH) {
        return { type: SEND_GAME_STATE };
    }
    if (action.type === SEND_GAME_STATE) {
        return {
            type: GET_GAME_STATE.SUCCESS, 
            payload: {
                ...state.game.toJS(),
                otherPlayerMark: state.app.playerMark
            }
        }
    }
    //return { type: 'UNKNOWN_ACTION', payload: { incomingAction: action, state } };
};

function* socketListenerSaga(socketChannel) {
    while (true) {
        const payload = yield take(socketChannel);
        const state = yield select();
        const roomCode = state.app.roomCode;
        console.log('receiving:', payload, {myRoomCode: roomCode});
        if (payload.roomCode === roomCode) {
            yield put(payload.action);
        }
    }
}

function* socketSpeakerSaga(socket) {
    while (true) {
        const action = yield take([PLAY_MOVE, GET_GAME_STATE.FETCH, SEND_GAME_STATE]);
        const state = yield select();
        const roomCode = state.app.roomCode;
        const responseAction = createMessageForAction(state, action);
        if (responseAction) {
            console.log('sending:', responseAction);
            yield apply(socket, socket.send, [
                JSON.stringify({ roomCode, action: responseAction })
            ]);
        }
    }
}

export function* gamePageWatcherSaga() {
    const socket = yield createWebSocketConnection();
    const socketChannel = yield call(createSocketChannel, socket);

    yield race({
        task: all([
            call(socketListenerSaga, socketChannel),
            call(socketSpeakerSaga, socket)
        ])
    });
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
    const valid = mark === currentState.get('turnPlayer')
        && !currentState.getIn(['board', subGameIndex, position], null);
    if (!valid) {
        if (mark !== currentState.get('turnPlayer')) {
            console.error('invalid move:', mark, 'should be', currentState.get('turnPlayer'));
        }
        if (currentState.getIn(['board', subGameIndex, position], null)) {
            console.error('invalid move:', `[${subGameIndex}, ${position}]`, 'is', currentState.getIn(['board', subGameIndex, position], null));
        }
    }
    return valid;
}

export function game(state = initialState, action) {
    switch (action.type) {
        case PLAY_MOVE:
            const { subGameIndex, position, mark } = action.payload;
            if (isMoveValid(state, subGameIndex, position, mark)) {
                state = state.setIn(['board', subGameIndex, position], mark);
                const nextSubGame = position;
                const isNextSubGameWon = !!findWinner(state.getIn(['board', nextSubGame]).toJS());
                return state.merge({
                    restrictedSubgame: !isNextSubGameWon ? nextSubGame : null,
                    turnPlayer: mark === 'o' ? 'x' : 'o'
                });
            } else {
                // fire an error i guess
                return state;
            }
        case CREATE_ROOM:
            return state.merge({ isInitialized: true });
        case GET_GAME_STATE.SUCCESS:
            return state.merge({
                board: action.payload.board,
                restrictedSubgame: action.payload.restrictedSubgame,
                turnPlayer: action.payload.turnPlayer,
                isInitialized: true,
            });
        case RESET_GAME:
            return initialState;
        default:
            return state;
    }
}