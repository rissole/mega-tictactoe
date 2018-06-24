import { connect } from 'react-redux';
import RoomPageComponent from './RoomPageComponent';

import { joinRoom } from './redux';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {
  joinRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomPageComponent);
