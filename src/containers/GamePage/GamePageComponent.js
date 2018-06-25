import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import GameBoard from '../../components/GameBoard';
import Mark from '../../components/Mark';

const GameStatus = styled.div`
  padding-bottom: 20px;
`;

export default class GamePageComponent extends Component {

  static propTypes = {
    roomCode: PropTypes.string.isRequired,
    boardState: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.oneOf(['o', 'x']))
    ),
    playMove: PropTypes.func.isRequired,
    playerMark: PropTypes.oneOf(['x', 'o']),
    restrictedSubgame: PropTypes.number,
    setCurrentRoom: PropTypes.func.isRequired,
    turnPlayer: PropTypes.oneOf(['x', 'o']),
    isInitialized: PropTypes.bool,
    getGameState: PropTypes.func.isRequired
  };

  componentDidMount() {
      this.props.setCurrentRoom(this.props.roomCode);
      this.props.getGameState(this.props.roomCode);
  }

  _renderStatus() {
    const { playerMark, isInitialized, turnPlayer } = this.props;
    let message = null;
    if (!isInitialized) {
      message = (
        <span>Loading...</span>
      ); 
    } else if (turnPlayer !== playerMark) {
      message = (
        <span>Waiting for &nbsp; <Mark symbol={turnPlayer} /></span>
      );
    } else {
      return <GameStatus />;
    }
    return (<GameStatus>
      { message }
    </GameStatus>);
  }

  render() {
    const { boardState, playMove, playerMark, restrictedSubgame, isInitialized, turnPlayer } = this.props;
    const disabled = (!isInitialized || turnPlayer !== playerMark);

    return (
      <React.Fragment>
        {this._renderStatus()}
        <GameBoard
          disabled={disabled}
          boardState={boardState}
          playMove={playMove}
          playerMark={playerMark}
          restrictedSubgame={restrictedSubgame}
        />
      </React.Fragment>
    );
  }
}