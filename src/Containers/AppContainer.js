import React, { Component } from 'react'

export default class extends Component {

  constructor() {
    super()
  }

  render() {
    function test() {
      alert('hi');
    }

    return (
      <div className="App">
        <form action="/spaceghost" method="post">
            <input type="text" name="textmsg" />
            <button type="submit">send message</button>
        </form>
      </div>
    );
  }
}
