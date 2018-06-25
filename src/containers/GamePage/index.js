import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import GamePageComponent from './GamePageComponent';

import { playMove, getGameState } from './redux';
import { setCurrentRoom } from '../RoomPage/redux';

const boardStateSelector = createSelector(
  (state) => state.game.get('board'),
  (board) => board.toJS()
)

const mapStateToProps = (state, ownProps) => ({
  roomCode: ownProps.match.params.roomCode,
  boardState: boardStateSelector(state),
  playerMark: state.app.playerMark,
  restrictedSubgame: state.game.get('restrictedSubgame'),
  isInitialized: state.game.get('isInitialized'),
  turnPlayer: state.game.get('turnPlayer')
});

const mapDispatchToProps = {
  playMove,
  setCurrentRoom,
  getGameState
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePageComponent);
