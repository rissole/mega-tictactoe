import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import GamePageComponent from './GamePageComponent';

import { playMove } from './redux';

const gameStateSelector = createSelector(
  (state) => state.game,
  (game) => game.toJS()
)

const mapStateToProps = (state, ownProps) => ({
  roomCode: ownProps.match.params.roomCode,
  gameState: gameStateSelector(state),
  playerMark: state.app.playerMark
});

const mapDispatchToProps = {
  playMove
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePageComponent);
