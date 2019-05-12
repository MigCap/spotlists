import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

//import Login from '../../components/login/Login';
import LoginHook from '../../components/login/LoginHook';
import Dashboard from '../../components/Dashboard/Dashboard';
import Playlists from '../../components/Playlists/Playlists';
import Header from '../../components/Header/Header';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Switch>
            <Route exact path="/" component={LoginHook} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/playlists" component={Playlists} />
          </Switch>
          <Header />
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
