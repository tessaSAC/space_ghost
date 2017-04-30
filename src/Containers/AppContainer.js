import React, { Component } from 'react';
import MessageComponent from '../components/Message.component';
import FormComponent from '../components/Form.component'
import axios from 'axios';

export default class extends Component {

  constructor() {
    super()
    this.numSenderMessages = 0;
    this.checkForMessages = this.checkForMessages.bind(this);
    this.pushToConvo = this.pushToConvo.bind(this);

    this.state = {
      allMessages: [
        {
          direction: 'toUser',
          senderName: 'Gus',
          message: 'Did you hear about Pluto?'
        },
        {
          direction: 'toUser',
          senderName: 'Gus',
          message: 'That\'s messed up, right?'
        }
      ]
    }
  }


  checkForMessages() {
    axios.get('/messageInbox')
    .then(response => response.data)
    .then(backendMessageArray => {
      console.log('checking for new messages...');
      if (backendMessageArray.length > this.numSenderMessages) {
        const newMessages = backendMessageArray.slice(this.numSenderMessages);
        for (let i = 0; i < newMessages.length; ++i) {
          this.pushToConvo({
            direction: 'toUser',
            senderName: 'Gus',
            message: newMessages[i].Body
          });
        }
        this.numSenderMessages = backendMessageArray.length
      };

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

    return (
      <div className="App" style={style}>
        <div className="container">
          <div className="row">
            <div className="col s6">
            </div>
            <div className="col s6">
              <ul className="collection">
                { this.state.allMessages && this.state.allMessages
                  .map((message, idx) => <MessageComponent key={idx} message={message} />)
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


// Old other component
// { this.state.allMessages && this.state.allMessages
//   .filter(message => (message.direction === 'fromUser'))
//   .map((message, idx) => <UserMessageComponent key={idx} message={message} />)
// }