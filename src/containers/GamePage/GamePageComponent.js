import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import GameBoard from '../../components/GameBoard';
import Mark from '../../components/Mark';

const GameStatus = styled.div`
  display: inline-block;
  padding-bottom: 20px;
  line-height: 1.5;
`;

const RoomCode = styled.div`
  display: inline-block;
  padding-bottom: 20px;
  line-height: 1.5;
  font-variant: small-caps;
  padding-right: 10px;
  
  &:before {
    content: 'room code:';
    padding-right: 0.5em;
  }
`;

const StatusContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
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
      setTimeout(() => this.props.getGameState(roomCode), 2000);
      this.fetchStateTimeout = setTimeout(this._setLoadFailedState, 7000);
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
    let message = 'It\'s your move!';
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
    }
    return (<GameStatus>
      {message}
    </GameStatus>);
  }

  render() {
    const { roomCode, boardState, playMove, playerMark, restrictedSubgame, isInitialized, turnPlayer } = this.props;
    const disabled = (!isInitialized || turnPlayer !== playerMark);

    return (
      <React.Fragment>
        <StatusContainer>
          {this._renderStatus()}
          <RoomCode>{roomCode}</RoomCode>
        </StatusContainer>
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