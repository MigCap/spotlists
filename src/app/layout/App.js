import React, { Component, Fragment } from 'react';
import './App.css';

import Playlisting from '../../components/Dashboard/Playlisting';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Playlisting />
      </Fragment>
    );
  }
}

export default App;
