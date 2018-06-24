import { CREATE_ROOM, JOIN_ROOM, SET_CURRENT_ROOM } from '../RoomPage/redux';

// REDUCER

const initialState = {
    playerMark: 'o',
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
                playerMark: 'o',
                roomCode: action.payload
            };
        case CREATE_ROOM:
            return {
                ...state,
                playerMark: 'x',
                roomCode: action.payload
            };
    }

    return state;
}