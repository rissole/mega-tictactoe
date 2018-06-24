import { connect } from 'react-redux';

import GamePageComponent from './GamePageComponent';

const mapStateToProps = (state, ownProps) => ({
  roomCode: ownProps.match.params.roomCode
});

export default connect(mapStateToProps)(GamePageComponent);
