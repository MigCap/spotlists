import React, { Component } from 'react';
import { token } from '../spotify';

import './App.css';

import Login from '../../components/login/Login';
import Profile from '../../components/Profile';

class App extends Component {
  state = {
    token: ''
  };

  componentDidMount() {
    this.setState({ token });
  }

  render() {
    const { token } = this.state;

    return <div className="App">{token ? <Profile /> : <Login />}</div>;
  }
}

export default App;
