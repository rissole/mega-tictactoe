import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SquareInternal = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 0 auto;
    height: auto;
    border: 1px solid black;
    &:before {
        content: '';
        float: left;
        padding: 50% 0
    }
    content: ' ';
    ${props => !props.mark && `
        &:hover {
            background: yellow;
        }
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

const MarkWrapper = styled.div`
    display: inline-block;
    width: 1em;
`;

export default class Square extends Component {
    static propTypes = {
        borders: PropTypes.arrayOf(PropTypes.oneOf(['t', 'l', 'b', 'r'])),
        mark: PropTypes.oneOf(['x', 'o']),
        playMove: PropTypes.func.isRequired,
        subGameIndex: PropTypes.number.isRequired,
        position: PropTypes.number.isRequired,
        playerMark: PropTypes.oneOf(['x', 'o']).isRequired,
    };

    _onClick = () => {
        const { mark, playMove, subGameIndex, position, playerMark } = this.props;

        if (mark) {
            return;
        }

        playMove(subGameIndex, position, playerMark);
    };

    _renderMark = () => {
        const { mark } = this.props;
        if (mark === 'o') {
            return '⭕️';
        } else if (mark === 'x') {
            return '❌';
        }
        return null;
    }

    render() {
        return (<SquareInternal onClick={this._onClick}>
            <MarkWrapper>{this._renderMark()}</MarkWrapper>
        </SquareInternal>);
    }
}