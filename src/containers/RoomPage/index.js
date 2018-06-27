import { connect } from 'react-redux';
import RoomPageComponent from './RoomPageComponent';

import { joinRoom, createRoom } from './redux';
import { resetGame } from '../GamePage/redux';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {
  joinRoom,
  createRoom,
  resetGame
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomPageComponent);
