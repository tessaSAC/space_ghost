import React, { Component } from 'react';
import FriendsMessageComponent from '../components/FriendsMessage.component';
import UserMessageComponent from '../components/UserMessage.component';
import FormComponent from '../components/Form.component'
import axios from 'axios';

export default class extends Component {

  constructor() {
    super()
    this.numSenderMessages = 0;
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


  checkForMessages() {
    axios.get('/messageInbox')
    .then(response => response.data)
    .then(backendMessageArray => {
      console.log('checking for new messages...');
      console.log(backendMessageArray)
      if (backendMessageArray !== "") {
        if (backendMessageArray.length > this.numSenderMessages) {
          const newMessages = backendMessageArray.slice(this.numSenderMessages);
          for (let i = 0; i < newMessages.length; ++i) {
            console.log(newMessages[i]);
          }
          this.numSenderMessages = backendMessageArray.length
        };
      }

      // if (backendMessageArray.length > this.numSenderMessages) {
      //   // for (let i = this.numSenderMessage; i < backendMessageArray.length; ++i) {
      //   // }
      //   console.log(backendMessageArray);
      //   this.numSenderMessages = backendMessageArray.length;
      // }
    });
  }

  pushToConvo(newMessage) {
    console.log("I'm pushing it!!", newMessage);
    const newState = Object.assign({}, this.state, {
      allMessages: this.state.allMessages.concat(newMessage)
    })
    this.setState(newState);
  }

  componentDidMount(){
    window.setInterval(this.checkForMessages, 500)
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