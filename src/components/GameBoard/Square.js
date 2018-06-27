import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Mark from '../Mark';

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
        disabled: PropTypes.bool
    };

    canClick = () => {
        const { disabled } = this.props;
        return (!this.props.mark && !disabled);
    }

    _onClick = () => {
        this.canClick() && this.props.onClick(this.props.subGameIndex, this.props.position);
    }

    render() {
        return (<SquareInternal {...this.props} canClick={this.canClick()} onClick={this._onClick}>
            <MarkWrapper><Mark symbol={this.props.mark} /></MarkWrapper>
        </SquareInternal>);
    }
}