import React, { Component, Fragment } from 'react';

import Login from '../login/Login';
import Header from '../../components/Header/Header';
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

  formatString(string) {
    return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
  }

  renderLogin(user, playlists, fetchingUser, fetchingPlaylists) {
    if ((!user || !playlists) && (!fetchingUser || !fetchingPlaylists)) {
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

    if (!user && !playlistToRender && (fetchingPlaylists || fetchingUser)) {
      return (
        <div className="img-loading-overlay">
          <div className="img-spinning-circle" />
        </div>
      );
    } else {
      return (
        <Fragment>
          <Header />
          <div className="app-playlists">
            <div className="avatar mx-auto mt-5">
              <svg
                id="user-icon"
                viewBox="0 0 1024 1024"
                width="100%"
                height="100%">
                <path d="m730.06 679.64q-45.377 53.444-101.84 83.443t-120 29.999q-64.032 0-120.75-30.503t-102.6-84.451q-40.335 13.109-77.645 29.747t-53.948 26.722l-17.142 10.084q-29.747 19.159-51.175 57.729t-21.428 73.107 25.461 59.242 60.754 24.705h716.95q35.293 0 60.754-24.705t25.461-59.242-21.428-72.603-51.679-57.225q-6.554-4.033-18.907-10.84t-51.427-24.453-79.409-30.755zm-221.84 25.72q-34.285 0-67.561-14.873t-60.754-40.335-51.175-60.502-40.083-75.124-25.461-84.451-9.075-87.728q0-64.032 19.915-116.22t54.452-85.964 80.67-51.931 99.072-18.151 99.072 18.151 80.67 51.931 54.452 85.964 19.915 116.22q0 65.04-20.167 130.58t-53.948 116.72-81.426 83.443-98.568 32.268z" />
              </svg>
            </div>

            <h5 className="text-white p-2 pb-3 pt-3">
              {this.formatString(user.name)}
            </h5>
            <div className="d-flex justify-content-center">
              <PlaylistCounter playlists={playlistToRender} />
              <HoursCounter playlists={playlistToRender} />
            </div>

            <SearchFilter
              onTextChange={text => this.setState({ filterString: text })}
            />
            <div className="mt-lg-5">
              <h5 className="text-white font-weight-bold text-left ml-5 mb-4">
                Playlists
              </h5>
              {playlistToRender && playlistToRender.length !== 0 ? (
                playlistToRender.map((playlist, index) => (
                  <PlaylistCard playlist={playlist} key={index} />
                ))
              ) : (
                <div className="mt-5 text-white">
                  <h6>No playlists or tracks matching the search</h6>
                </div>
              )}
            </div>
          </div>
        </Fragment>
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
    const { user, playlists, fetchingUser, fetchingPlaylists } = this.state;

    return (
      <div className="App">
        {user && playlists
          ? this.renderPlaylists(user)
          : this.renderLogin(user, playlists, fetchingUser, fetchingPlaylists)}
      </div>
    );
  }
}

export default Playlisting;
