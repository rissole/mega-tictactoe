import { JOIN_ROOM } from '../RoomPage/redux';

// REDUCER

const initialState = {
};

export function app(state = initialState, action) {
    switch (action.type) {
        case JOIN_ROOM:
            return {
                ...state
            };
            break;
    }

    return state;
}