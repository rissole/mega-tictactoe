import { fromJS } from 'immutable';

// ACTIONS

const PLAY_MOVE = 'PLAY_MOVE';

// ACTION CREATORS

export function playMove(subGameIndex, position, mark) {
    return { type: PLAY_MOVE, payload: { subGameIndex, position, mark } };
}

// SAGAS

// REDUCER

const initialState = fromJS({
    board: [
        [], [], [],
        [], [], [],
        [], [], []
    ],
    restrictedSubgame: null
});

export function game(state = initialState, action) {
    switch (action.type) {
        case PLAY_MOVE:
            const { subGameIndex, position, mark } = action.payload;
            state = state.setIn(['board', subGameIndex, position], mark);
            return state.set('restrictedSubgame', position);
    }

    return state;
}