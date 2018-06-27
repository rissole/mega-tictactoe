import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SubGame from './SubGame';
import { BORDER_MAP } from './util';

const GameWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
`;

export default class GameBoard extends Component {
    static propTypes = {
        boardState: PropTypes.arrayOf(
            PropTypes.arrayOf(PropTypes.oneOf(['o', 'x']))
        ).isRequired,
        playMove: PropTypes.func.isRequired,
        playerMark: PropTypes.oneOf(['x', 'o']),
        restrictedSubgame: PropTypes.number,
        disabled: PropTypes.bool
    }

    _onSquareClick = (subGameIndex, position) => {
        const { playMove, playerMark } = this.props;
        playMove(subGameIndex, position, playerMark);
    };

    render() {
        const { boardState, restrictedSubgame, disabled } = this.props;

        return (
            <GameWrapper>
                {boardState.map((subGame, subGameIndex) => {
                    return (
                        <SubGame
                            key={`subgame${subGameIndex}`}
                            borders={BORDER_MAP[subGameIndex]}
                            restrictedSubgame={restrictedSubgame}
                            subGameIndex={subGameIndex}
                            boardState={subGame}
                            disabled={disabled}
                            onSquareClick={this._onSquareClick}
                        />
                    )
                })}
            </GameWrapper>
        );
    }
};