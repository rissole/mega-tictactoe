import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';


const Section = styled.div`
    padding-bottom: 30px;
`;

const Label = styled.label`
    display: inline-block;
    padding: 5px 0;
    font-weight: bold;
`;

const Textbox = styled.input`
    font-size: large;
    height: 2em;
    width: 100%;
`;

export default class RoomPageComponent extends Component {
    state = {
        roomCode: ''
    };

    static propTypes = {
        joinRoom: PropTypes.func.isRequired,
        createRoom: PropTypes.func.isRequired,
        resetGame: PropTypes.func.isRequired
    };

    onRoomCodeChange = (event) => {
        this.setState({
            roomCode: event.target.value
        });
    }

    onCreateRoomClick = () => {
        this.props.createRoom();
    }

    onJoinRoomClick = () => {
        this.props.joinRoom(this.state.roomCode);
    }

    componentDidMount() {
        this.props.resetGame();
      }

    render() {
        return (
            <div>
                <Section>
                    <h2>Create or join a room</h2>
                    <Section>
                        <Label>Room code</Label>
                        <div>
                            <Textbox placeholder="Enter 4-letter code" onChange={this.onRoomCodeChange} />
                        </div>
                    </Section>
                    <Button onClick={this.onJoinRoomClick}>Join room</Button>
                    <span style={{ padding: '0 5px' }}>or</span>
                    <Button onClick={this.onCreateRoomClick}>Create new room</Button>
                </Section>
            </div>
        );
    }
}