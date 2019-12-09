import React, { Component } from 'react';
import { token } from 'app/spotify';

import './App.scss';

import Login from 'pages/LoginPage/Login';
import Profile from 'app/layout/Profile';

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
