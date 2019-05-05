import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import Login from '../../components/login/Login';
import Dashboard from '../../components/Dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
