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
    playerMark: PropTypes.oneOf(['x', 'o']).isRequired,
    restrictedSubgame: PropTypes.number
  };

  render() {
    const { roomCode, gameState, playMove, playerMark, restrictedSubgame } = this.props;

    return (
      <div>
        <GameBoard
            gameState={gameState}
            playMove={playMove}
            playerMark={playerMark}
            restrictedSubgame={restrictedSubgame}
        />
      </div>
    );
  }
}