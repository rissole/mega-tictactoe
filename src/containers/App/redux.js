import { CREATE_ROOM, JOIN_ROOM } from '../RoomPage/redux';

// REDUCER

const initialState = {
    playerMark: 'o'
};

export function app(state = initialState, action) {
    switch (action.type) {
        case JOIN_ROOM:
            return {
                ...state,
                playerMark: 'o'
            };
        case CREATE_ROOM:
            return {
                ...state,
                playerMark: 'x'
            };
    }

    return state;
}