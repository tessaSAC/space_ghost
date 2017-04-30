import React, { Component } from 'react';
import axios from 'axios';

export default class extends Component {

  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    console.log('hi')
    e.preventDefault();
    const newTextMsg = e.target.textmsg.value;
    e.target.textmsg.value = '';
    console.log(newTextMsg);

    this.props.pushToConvo({
      direction: 'fromUser',
      senderName: 'gus',
      message: newTextMsg
    });

    axios.post('/spaceghost', {
      Body: newTextMsg
    })
    .then(() => console.log('i posted!'))
    .catch(console.error);
  }


  render() {

    const style = {
      color: 'white',
      '.inputField input[type=text]:focus': {
        borderBottom: '1px solid pink',
        boxShadow: '0 1px 0 0 #000'
      }
    }

    return (
      <form action="/spaceghost" method="post" onSubmit={this.handleSubmit} style={style}>
        <div className="row">
          <div className="col s10">
            <input  id="textmsg" type="text" name="textmsg" />
          </div>
          <div className="col s1 push-s1">
            <button className="waves-effect waves-circle waves-light btn-floating secondary-content purple" type="submit" name="action">
                <i className="material-icons right">send</i>
            </button>
          </div>
        </div>
      </form>
    );
  }
}
