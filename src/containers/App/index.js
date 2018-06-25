import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import GamePage from '../GamePage';
import RoomPage from '../RoomPage';

const Header = styled.header`
  background-color: #222;
  height: 60px;
  padding: 5px;
  color: white;
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Body = styled.div`
  padding: 20px;
  max-width: 720px;
  margin: 0 auto;
`;

class App extends Component {
  render() {
    return (
      <div>
        <Header>
          Mega Tic-Tac-Toe&nbsp;<span role="img" aria-label="circle">⭕️</span>
        </Header>
        <Body>
          <Switch>
            <Route exact path="/" component={RoomPage} />
            <Route path="/:roomCode" component={GamePage} />
          </Switch>
        </Body>
      </div>
    );
  }
}

export default withRouter(connect()(App));
