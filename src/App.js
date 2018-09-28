import React, { Component } from 'react';
import logo from './logo.svg';
import ExchangeContainer from './components/ExchangeContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
				<ExchangeContainer />
      </div>
    );
  }
}

export default App;
