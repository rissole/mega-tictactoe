import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import GameBoard from '../../components/GameBoard';
import Mark from '../../components/Mark';

const GameStatus = styled.div`
  padding-bottom: 20px;
`;

export default class GamePageComponent extends Component {

  state = {
    hasLoadFailed: false
  };

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
    this.fetchStateTimeout = null;
    this._fetchGameInfo(this.props.roomCode);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.roomCode !== nextProps.roomCode) {
      this._fetchGameInfo(nextProps.roomCode);
    }
    if (nextProps.isInitialized) {
      clearTimeout(this.fetchStateTimeout);
      this.fetchStateTimeout = null;
    }
  }

  _fetchGameInfo = (roomCode) => {
    if (!this.props.isInitialized && roomCode) {
      this.props.setCurrentRoom(roomCode);
      this.props.getGameState(roomCode);
      this.fetchStateTimeout = setTimeout(this._setLoadFailedState, 5000);
    }
  }

  _setLoadFailedState = () => {
    this.fetchStateTimeout = null;
    if (!this.props.isInitialized) {
      this.setState({
        hasLoadFailed: true
      });
    }
  }

  _renderStatus() {
    const { playerMark, isInitialized, turnPlayer } = this.props;
    let message = null;
    if (this.state.hasLoadFailed) {
      message = (
        <span>This room doesn't exist. Go back <Link to="/">home</Link> to create a new one.</span>
      );
    } else if (!isInitialized) {
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
      {message}
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