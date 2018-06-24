import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import GamePageComponent from './GamePageComponent';

import { playMove } from './redux';
import { setCurrentRoom } from '../RoomPage/redux';

const gameStateSelector = createSelector(
  (state) => state.game.get('board'),
  (game) => game.toJS()
)

const mapStateToProps = (state, ownProps) => ({
  roomCode: ownProps.match.params.roomCode,
  gameState: gameStateSelector(state),
  playerMark: state.app.playerMark,
  restrictedSubgame: state.game.get('restrictedSubgame')
});

const mapDispatchToProps = {
  playMove,
  setCurrentRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePageComponent);
