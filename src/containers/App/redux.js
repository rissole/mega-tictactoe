import { CREATE_ROOM, JOIN_ROOM, SET_CURRENT_ROOM } from '../RoomPage/redux';
import { GET_GAME_STATE } from '../GamePage/redux';

// REDUCER

const initialState = {
    playerMark: null,
    roomCode: null
};

export function app(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_ROOM: {
            return {
                ...state,
                roomCode: action.payload
            };
        }
        case JOIN_ROOM:
            return {
                ...state,
                roomCode: action.payload
            };
        case CREATE_ROOM:
            return {
                ...state,
                playerMark: 'x',
                roomCode: action.payload
            };
        case GET_GAME_STATE.SUCCESS:
            return {
                ...state,
                playerMark: action.payload.otherPlayerMark === 'x' ? 'o' : 'x'
            }
        default:
            return state;
    }
}