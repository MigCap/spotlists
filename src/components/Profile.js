import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from './NavBar/NavBar';
import Dashboard from './Dashboard/Dashboard';
import TopArtists from './TopArtists/TopArtists';
import Artist from './Artist/Artist';
import TopTracks from './TopTracks/TopTracks';
import Album from './Album/Album';
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
            <Route path="/top-artists" component={TopArtists} />
            <Route path="/top-tracks" component={TopTracks} />
            <Route path="/recent" component={Recent} />
            <Route path="/playlists" component={Playlists} />
            <Route path="/artist/:artistId" component={Artist} />
            <Route path="/album/:albumId" component={Album} />
            <Route path="/playlists/:playlistId" component={Playlist} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default Profile;
