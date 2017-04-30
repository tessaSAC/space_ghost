import React, { Component } from 'react';
import FriendsMessageComponent from '../components/FriendsMessage.component';
import UserMessageComponent from '../components/UserMessage.component';
import FormComponent from '../components/Form.component'
import axios from 'axios';

export default class extends Component {

  constructor() {
    super()
    this.pushToConvo = this.pushToConvo.bind(this);

    this.state = {
      allMessages: [
        {
          direction: 'toUser',
          senderName: 'gus',
          message: 'did you hear about pluto'
        }
      ]
    }
  }

  pushToConvo(newMessage) {
    const newState = Object.assign({}, this.state, {
      allMessages: this.state.allMessages.concat(newMessage)
    })
    this.setState(newState);
  }


  render() {
    const style = {
      backgroundColor: '#311b92'
    };

    const sender = {
      name: 'gus',
      message: 'hey'
    }

    return (
      <div className="App" style={style}>
        <div className="container">
          <div className="row">
            <div className="col s6">
            </div>
            <div className="col s6">
              <ul className="collection">
                { this.state.allMessages && this.state.allMessages
                  .filter(message => (message.direction === 'toUser'))
                  .map((message, idx) => <FriendsMessageComponent key={idx} message={message} />)
                }
                { this.state.allMessages && this.state.allMessages
                  .filter(message => (message.direction === 'fromUser'))
                  .map((message, idx) => <UserMessageComponent key={idx} message={message} />)
                }
              </ul>
              <hr />
              <FormComponent pushToConvo={this.pushToConvo} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
