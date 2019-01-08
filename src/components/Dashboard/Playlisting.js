import React, { Component } from 'react';

import Login from '../login/Login';
import PlaylistCard from './PlaylistCard';
import SearchFilter from './SearchFilter';
import HoursCounter from './HoursCounter';
import PlaylistCounter from './PlaylistCounter';

import queryString from 'query-string';

class Playlisting extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: '',
      fetchingUser: true,
      fetchingPlaylists: true
    };
  }
  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    if (!accessToken) return;

    this.fetchUser(accessToken);
    this.fetchPlaylists(accessToken);
  }

  fetchUser(accessToken) {
    fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: 'Bearer ' + accessToken }
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          user: {
            name: data.display_name ? data.display_name : data.id
          },
          fetchingUser: false
        })
      );
  }

  fetchPlaylists(accessToken) {
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: { Authorization: 'Bearer ' + accessToken }
    })
      .then(response => response.json())
      .then(playlistData => {
        let playlists = playlistData.items;
        let trackDataPromises = playlists.map(playlist => {
          let responsePromise = fetch(playlist.tracks.href, {
            headers: { Authorization: 'Bearer ' + accessToken }
          });
          let trackDataPromise = responsePromise.then(response =>
            response.json()
          );
          return trackDataPromise;
        });
        let allTracksDataPromises = Promise.all(trackDataPromises);
        let playlistsPromise = allTracksDataPromises.then(trackDatas => {
          trackDatas.forEach((trackData, i) => {
            playlists[i].trackDatas = trackData.items
              .map(item => item.track)
              .map(trackData => ({
                name: trackData.name,
                duration: trackData.duration_ms / 1000
              }));
          });
          return playlists;
        });
        return playlistsPromise;
      })
      .then(playlists =>
        this.setState({
          playlists: playlists.map(item => {
            return {
              name: item.name,
              imageUrl: item.images.find(image => image.width === 300).url,
              songs: item.trackDatas.slice(0, 3)
            };
          }),
          fetchingPlaylists: false
        })
      );
  }

  renderLogin() {
    let fetchingPlaylists = this.state.fetchingPlaylists;
    let fetchingUser = this.state.fetchingUser;
    if (fetchingUser || fetchingPlaylists) {
      return (
        <div className="img-loading-overlay">
          <div className="img-spinning-circle" />
        </div>
      );
    } else {
      return <Login />;
    }
  }

  renderPlaylists(user) {
    let playlistToRender = this.filterPlaylists();
    let fetchingUser = this.state.fetchingUser;
    let fetchingPlaylists = this.state.fetchingPlaylists;

    if (user && playlistToRender && !fetchingPlaylists && !fetchingUser) {
      return (
        <div className="app-playlists">
          <h1 className="text-white p-2 pb-5 pt-5">
            {user.name}
            's Playlists
          </h1>
          <PlaylistCounter playlists={playlistToRender} />
          <HoursCounter playlists={playlistToRender} />

          <SearchFilter
            onTextChange={text => this.setState({ filterString: text })}
          />
          <div className="row justify-content-around mt-2">
            {playlistToRender.map((playlist, index) => (
              <PlaylistCard playlist={playlist} key={index} />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="img-loading-overlay">
          <div className="img-spinning-circle" />
        </div>
      );
    }
  }

  filterPlaylists() {
    const user = this.state.user;
    let playlists = this.state.playlists;

    if (user && playlists) {
      return playlists.filter(playlist => {
        let matchesPlaylist = playlist.name
          .toLowerCase()
          .includes(this.state.filterString.toLowerCase());
        let matchesSong = playlist.songs.filter(song =>
          song.name
            .toLowerCase()
            .includes(this.state.filterString.toLowerCase())
        );
        return matchesPlaylist || matchesSong.length > 0;
      });
    } else {
      return [];
    }
  }

  render() {
    const { user, playlists } = this.state;

    return (
      <div className="App">
        {user && playlists ? this.renderPlaylists(user) : this.renderLogin()}
      </div>
    );
  }
}

export default Playlisting;
