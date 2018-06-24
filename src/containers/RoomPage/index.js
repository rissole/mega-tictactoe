import { connect } from 'react-redux';
import RoomPageComponent from './RoomPageComponent';

import { joinRoom, createRoom } from './redux';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {
  joinRoom,
  createRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomPageComponent);
