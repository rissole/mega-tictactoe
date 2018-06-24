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
    &:hover {
        background: ${props => props.canClick ? 'yellow' : 'none'};
    }

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
        onClick: PropTypes.func,
        subGameIndex: PropTypes.number.isRequired,
        position: PropTypes.number.isRequired,
        legalClickTarget: PropTypes.bool.isRequired
    };

    canClick = () => {
        return (!this.props.mark && this.props.legalClickTarget);
    }

    _onClick = () => {
        this.canClick() && this.props.onClick(this.props.subGameIndex, this.props.position);
    }

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
        return (<SquareInternal {...this.props} canClick={this.canClick()} onClick={this._onClick}>
            <MarkWrapper>{this._renderMark()}</MarkWrapper>
        </SquareInternal>);
    }
}