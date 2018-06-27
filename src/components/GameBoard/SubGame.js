import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Square from './Square';
import Mark from '../Mark';
import { BORDER_MAP, findWinner } from './util';

const SubGameRow = styled.div`
    display: flex;
`;

const SubGameInternal = styled.div`
    display: block;
    position: relative;
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

const WinnerBlanketInternal = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    content: ' ';
    width: 100%; 
    height: 100%;
    background: rgba(255,255,255,.75);

    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 80px;
    pointer-events: none;
`;

const WinnerBlanket = (props) => (
    <WinnerBlanketInternal {...props}>
        <Mark symbol={props.mark} />
    </WinnerBlanketInternal>
);

export default class SubGame extends Component {

    static propTypes = {
        borders: PropTypes.arrayOf(PropTypes.oneOf(['t', 'l', 'b', 'r'])),
        boardState: PropTypes.arrayOf(PropTypes.oneOf(['o', 'x'])),
        restrictedSubgame: PropTypes.number,
        subGameIndex: PropTypes.number.isRequired,
        disabled: PropTypes.bool,
        onSquareClick: PropTypes.func.isRequired
    };

    render() {
        const { boardState, subGameIndex, restrictedSubgame, disabled } = this.props;
        const winner = findWinner(boardState);

        return (
            <SubGameInternal {...this.props} isHighlighted={subGameIndex === restrictedSubgame}>
                {[0,1,2].map((row) => {
                    return (
                        <SubGameRow key={`row${row}`}>
                            {[0,1,2].map((column) => {
                                const position = 3 * row + column;
                                return <Square
                                    key={`${subGameIndex},${position}`}
                                    borders={BORDER_MAP[position]}
                                    mark={boardState[position]}
                                    subGameIndex={subGameIndex}
                                    position={position}
                                    onClick={this.props.onSquareClick}
                                    disabled={winner || disabled}
                                    restrictedSubgame={restrictedSubgame}
                                />
                            })}
                        </SubGameRow>
                    );
                })}
                { winner ? <WinnerBlanket mark={winner} /> : null }
            </SubGameInternal>
        );
    }
}