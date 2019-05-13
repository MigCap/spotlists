import React, { Component } from 'react';
import { getToken } from '../spotify';

import './App.css';

import Login from '../../components/login/Login';
import Profile from '../../components/Profile';

class App extends Component {
  state = {
    getToken: ''
  };

  componentDidMount() {
    this.setState({ getToken });
  }

  render() {
    const { getToken } = this.state;

    return <div className="App">{getToken ? <Profile /> : <Login />}</div>;
  }
}

export default App;
