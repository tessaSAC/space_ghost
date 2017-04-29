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
        <form action="">
          <input type="text" />
          <button type="submit"></button>
        </form>
      </div>
    );
  }
}

export default App;
