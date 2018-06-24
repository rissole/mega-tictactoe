import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class GamePageComponent extends Component {

  static propTypes = {
    roomCode: PropTypes.string.isRequired
  };

  render() {
    const { roomCode } = this.props;

    return (
      <div>
        <div>
          <span>Room code:</span><span>{roomCode}</span>
        </div>
        <div>
        </div>
      </div>
    );
  }
}