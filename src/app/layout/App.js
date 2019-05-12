import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import LoginHook from '../../components/login/LoginHook';
import Dashboard from '../../components/Dashboard/Dashboard';
import TopArtists from '../../components/TopArtists/TopArtists';
import TopTracks from '../../components/TopTracks/TopTracks';
import Recent from '../../components/Recent/Recent';
import Playlists from '../../components/Playlists/Playlists';
import Header from '../../components/Header/Header';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={LoginHook} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/top-artists" component={TopArtists} />
            <Route exact path="/top-tracks" component={TopTracks} />
            <Route exact path="/recent" component={Recent} />
            <Route exact path="/playlists" component={Playlists} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
