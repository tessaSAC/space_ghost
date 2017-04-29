import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    function test() {
      alert('hi');
    }

    return (
      <div className="App">
        <form action="/spaceghost" method="post">
            <input type="text" name="textmsg">
            <button type="submit">send message</button>
          </form>
      </div>
    );
  }
}

export default App;
