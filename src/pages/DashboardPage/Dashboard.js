import React, { Component } from 'react';

import { token, getUserInfo } from 'app/spotify';
import { catchErrors } from 'app/helpers';

import Login from 'pages/LoginPage/Login';
import UserAvatar from 'components/UserAvatar/UserAvatar';
import PlaylistCounter from 'components/PlaylistCounter/PlaylistCounter';
import HoursCounter from 'components/HoursCounter/HoursCounter';
import Followers from 'components/Followers/Followers';
import SearchFilter from 'components/SearchFilter/SearchFilter';
import PlaylistListing from 'components/PlaylistListing/PlaylistListing';

import Loader from 'components/Loader/Loader';

import './Dashboard.scss';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      accessToken: '',
      user: {
        name: '',
        followers: 0,
        url: ''
      },
      playlists: [],
      filterString: '',
      fetchingUser: true,
      fetchingPlaylists: true,
      fetchError: false
    };
  }

  componentDidMount() {
    const accessToken = token;
    if (accessToken) {
      // First resolve User Info
      const resolveUser = Promise.resolve(catchErrors(this.getUserInformation()))
      // Then Fetch User Playlists
      const whenUserInfo = resolveUser.then(() => this.fetchPlaylists(accessToken))
    }

    if (!token || this.state.fetchError) {
      return <Login />;
    }
  }

  async getUserInformation() {
    const { user } = await getUserInfo();
    this.setState({
      user: {
        name: user.display_name ? user.display_name : user.id,
        followers: user.followers.total,
        url: user.external_urls.spotify
      },
      fetchingUser: false
    });
  }

  fetchPlaylists(accessToken) {
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: { Authorization: 'Bearer ' + accessToken }
    })
      .then(response => response.json())
      .then(playlistData => {
        if (playlistData.error) {
          this.setState({
            fetchError: true
          });
          return this.handleLogout();
        } else {
          let playlists = playlistData.items;
          let trackDataPromises = playlists.map(playlist => {
            if (playlist.owner.id === this.state.user.name) {
              let responsePromise = fetch(playlist.tracks.href, {
                headers: { Authorization: 'Bearer ' + accessToken }
              });
              let trackDataPromise = responsePromise.then(response => response.json());
              return trackDataPromise;
            }
          });

          let allTracksDataPromises = Promise.all(trackDataPromises);

          let playlistsPromise = allTracksDataPromises.then(trackDatas => {
            trackDatas.forEach((trackData, i) => {
              if (trackData !== undefined) {
                playlists[i].trackDatas = trackData.items
                .map(item => item.track)
                .map(trackData => ({
                  artistName: trackData.artists[0].name,
                  artistId: trackData.artists[0].id,
                  albumTitle: trackData.album.name,
                  trackName: trackData.name,
                  duration: trackData.duration_ms / 1000
                }));
              }
            });
            return playlists;
          });
          return playlistsPromise;
        }
      })
      .then(playlists => {
        if (playlists && playlists.length >= 0) {
          const ownerPlaylists = playlists.filter(playlist => (playlist.owner.id === this.state.user.name))
          this.setState({
            playlists: ownerPlaylists.map(item => {
              return {
                name: item.name,
                imageUrl: item.images.find(
                  image => image.width === 300 || image.width === 640
                ).url,
                songs: item.trackDatas.slice(0, 3),
                totalTracks: item.tracks.total,
                externalUrl: item.external_urls.spotify,
                id: item.id
              };
            }),
            fetchingPlaylists: false
          });
        }
      });
  }

  handleLogout() {
    window.localStorage.removeItem('spotify_token_timestamp');
    window.localStorage.removeItem('spotify_access_token');
    window.localStorage.removeItem('spotify_refresh_token');
    window.location.href = '/';
  }

  filterPlaylists() {
    const { user, playlists } = this.state;

    if (user && playlists) {
      return playlists.filter(playlist => {
        let matchesPlaylist = playlist.name
          .toLowerCase()
          .includes(this.state.filterString.toLowerCase());
        let matchesSong = playlist.songs.filter(song =>
          song.trackName
            .toLowerCase()
            .includes(this.state.filterString.toLowerCase())
        );
        return matchesPlaylist || matchesSong.length > 0;
      });
    } else {
      return [];
    }
  }

  renderPlaylists() {
    const { user, playlists } = this.state;
    let playlistToRender = this.filterPlaylists();

    return (
      <div className="app-dashboard">
        <UserAvatar user={user.name} />
        <div className="d-flex justify-content-center">
          <PlaylistCounter playlists={playlistToRender} />
          <HoursCounter playlists={playlistToRender} />
          <Followers followers={user.followers} />
        </div>

        <button
          className="btn btn-sm btn-white text-white round-corner font-weight-bold mt-4 mb-5 px-4 py-2"
          onClick={() => this.handleLogout()}>
          LOGOUT
        </button>
        <SearchFilter
          onTextChange={text => this.setState({ filterString: text })}
        />
        <PlaylistListing
          user={user.name}
          playlists={playlists}
          playlistToRender={playlistToRender}
        />
      </div>
    );
  }

  render() {
    const { user, fetchingUser, fetchingPlaylists } = this.state;

    return user !== '' && !fetchingUser && !fetchingPlaylists ? (
      this.renderPlaylists()
    ) : (
      <Loader />
    );
  }
}

export default Dashboard;
