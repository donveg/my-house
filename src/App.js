import React, { Component } from 'react';
import './public.css'; 
import './App.css';
import NavSide from './components/NavSide';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavSide />
        {this.props.children}
      </div>
    );
  }
}

export default App;
