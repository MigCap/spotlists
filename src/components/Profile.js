import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from './NavBar/NavBar';
import Dashboard from './Dashboard/Dashboard';
import TopArtists from './TopArtists/TopArtists';
import TopTracks from './TopTracks/TopTracks';
import Recent from './Recent/Recent';
import Playlists from './Playlists/Playlists';

class Profile extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <NavBar />
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/top-artists" component={TopArtists} />
            <Route exact path="/top-tracks" component={TopTracks} />
            <Route exact path="/recent" component={Recent} />
            <Route exact path="/playlists" component={Playlists} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default Profile;
