import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Square from './Square';

const GameWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
`;

const SubGame = styled.div`
    display: block;
    width: 29%;
    padding: 1%;
    border: 4px solid black;
    ${props => props.isHighlighted && `
        background-color: palegoldenrod;
    `}

    ${props => props.borders && props.borders.includes('t') && `
        border-top: none;
    `}
    ${props => props.borders && props.borders.includes('l')  && `
        border-left: none;
    `}
    ${props => props.borders && props.borders.includes('b') && `
        border-bottom: none;
    `}
    ${props => props.borders && props.borders.includes('r')  && `
        border-right: none;
    `}
`;

const GameRow = styled.div`
    display: flex;
`;

const BORDER_MAP = [
    ['t','l'],
    ['t'],
    ['t','r'],
    
    ['l'],
    [],
    ['r'],

    ['b','l'],
    ['b'],
    ['b','r'],
]

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
                            isHighlighted={restrictedSubgame === subGameIndex}
                        >
                            {[0,1,2].map((row) => {
                                return (
                                    <GameRow key={`row${row}`}>
                                        {[0,1,2].map((column) => {
                                            const position = 3 * row + column;
                                            return <Square
                                              key={`${subGameIndex},${position}`}
                                              borders={BORDER_MAP[position]}
                                              mark={subGame[position]}
                                              subGameIndex={subGameIndex}
                                              position={position}
                                              onClick={this._onSquareClick}
                                              disabled={disabled}
                                            />
                                        })}
                                    </GameRow>
                                );
                            })}
                        </SubGame>
                    )
                })}
            </GameWrapper>
        );
    }
};