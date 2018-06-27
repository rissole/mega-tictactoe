import React from 'react';
import styled from 'styled-components';

const RulesInternal = styled.div`
    line-height: 1.5;
`;

export default (props) => (
    <RulesInternal {...props}>
        <h1>Rules</h1>
        <ul>
            <li>It's regular Tic Tac Toe, but to get your mark in a sqaure, <em>you must win that square's sub-game.</em></li>
            <li>You must play in the sub-game that maps to the <em>position your opponent played last turn.</em></li>
            <ul>
                <li>For example, if player one puts an X in the center square of the top-left sub-game, player two <strong>must play in the center sub-game.</strong></li>
            </ul>
            <li>Player one can start anywhere. If you are forced to play in a completed sub-game, you can play in any sub-game instead.</li>
        </ul>
    </RulesInternal>
)