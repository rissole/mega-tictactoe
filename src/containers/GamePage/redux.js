import { fromJS } from 'immutable';

// ACTIONS

const PLAY_MOVE = 'PLAY_MOVE';

// ACTION CREATORS

export function playMove(subGameIndex, position, mark) {
    return { type: PLAY_MOVE, payload: { subGameIndex, position, mark } };
}

// SAGAS

// REDUCER

const initialState = fromJS([
    [], [], [],
    [], [], [],
    [], [], []
]);

export function game(state = initialState, action) {
    switch (action.type) {
        case PLAY_MOVE:
            const { subGameIndex, position, mark } = action.payload;
            return state.setIn([subGameIndex, position], mark);
    }

    return state;
}