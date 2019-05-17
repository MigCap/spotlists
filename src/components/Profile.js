import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from './NavBar/NavBar';
import Dashboard from './Dashboard/Dashboard';
import TopArtists from './TopArtists/TopArtists';
import Artist from './Artist/Artist';
import TopTracks from './TopTracks/TopTracks';
import Recent from './Recent/Recent';
import Playlists from './Playlists/Playlists';
import Playlist from './Playlist/Playlist';

class Profile extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/top-artists" component={TopArtists} />
            <Route exact path="/top-tracks" component={TopTracks} />
            <Route exact path="/recent" component={Recent} />
            <Route exact path="/playlists" component={Playlists} />
            <Route exact path="/artist/:artistId" component={Artist} />
            <Route exact path="/playlists/:playlistId" component={Playlist} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default Profile;
