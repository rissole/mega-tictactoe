import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GameBoard from '../../components/GameBoard';

export default class GamePageComponent extends Component {

  static propTypes = {
    roomCode: PropTypes.string.isRequired,
    gameState: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.oneOf(['o', 'x']))
    ),
    playMove: PropTypes.func.isRequired,
    playerMark: PropTypes.oneOf(['x', 'o']).isRequired
  };

  render() {
    const { roomCode, gameState, playMove, playerMark } = this.props;

    return (
      <div>
        <div>
            <GameBoard gameState={gameState} playMove={playMove} playerMark={playerMark} />
        </div>
      </div>
    );
  }
}