export const BORDER_MAP = [
    ['t','l'],
    ['t'],
    ['t','r'],
    
    ['l'],
    [],
    ['r'],

    ['b','l'],
    ['b'],
    ['b','r'],
];

// 0 1 2
// 3 4 5
// 6 7 8
const winStates = [
    // rows
    [0,1,2],
    [3,4,5],
    [6,7,8],

    //columns
    [0,3,6],
    [1,4,7],
    [2,5,8],

    //diagonals
    [2,4,6],
    [0,4,8]
];

export function findWinner(boardState) {
    let winningMark = null;
    for (let i = 0; i < winStates.length; ++i) {
        const winState = winStates[i];
        if (boardState[winState[0]] &&
            boardState[winState[0]] === boardState[winState[1]] &&
            boardState[winState[0]] === boardState[winState[2]]
        ) {
            winningMark = boardState[winState[0]];
            break;
        }
    };
    return winningMark;
}