import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Header from '../../components/Header/Header';
import UserAvatar from './UserAvatar';
import PlaylistCounter from './PlaylistCounter';
import HoursCounter from './HoursCounter';
import Followers from './Followers';
import SearchFilter from './SearchFilter';
import PlaylistListing from '../PlaylistListing/PlaylistListing';

import Loader from '../Loader/Loader';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      accessToken: '',
      user: {
        name: '',
        followers: undefined,
        url: ''
      },
      playlists: [],
      filterString: '',
      fetchingUser: true,
      fetchingPlaylists: true
    };
  }

  componentDidMount() {
    let accessToken = this.props.location.state.accessToken;

    if (!accessToken) {
      return <Redirect to={{ pathname: '/' }} />;
    }

    this.fetchUser(accessToken);
    this.fetchPlaylists(accessToken);
  }

  fetchUser(accessToken) {
    fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: 'Bearer ' + accessToken }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          user: {
            name: data.display_name ? data.display_name : data.id,
            followers: data.followers.total,
            url: data.external_urls.spotify
          },
          fetchingUser: false
        });
      });
  }

  fetchPlaylists(accessToken) {
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: { Authorization: 'Bearer ' + accessToken }
    })
      .then(response => response.json())
      .then(playlistData => {
        // console.log(playlistData);
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
          console.log(trackDatas);
          trackDatas.forEach((trackData, i) => {
            playlists[i].trackDatas = trackData.items
              .map(item => item.track)
              .map(trackData => ({
                artistName: trackData.artists[0].name,
                albumTitle: trackData.album.name,
                trackName: trackData.name,
                duration: trackData.duration_ms / 1000
              }));
          });
          return playlists;
        });
        return playlistsPromise;
      })
      .then(playlists => {
        this.setState({
          playlists: playlists.map(item => {
            return {
              name: item.name,
              imageUrl: item.images.find(image => image.width === 300).url,
              songs: item.trackDatas.slice(0, 3),
              totalTracks: item.tracks.total,
              externalUrl: item.external_urls.spotify
            };
          }),
          fetchingPlaylists: false
        });
      });
  }

  filterPlaylists() {
    const { user, playlists } = this.state;
    // console.log(playlists);

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

  render() {
    const { user, playlists, fetchingUser, fetchingPlaylists } = this.state;
    let playlistToRender = this.filterPlaylists();

    return (
      <div className="App">
        {user && playlists && !fetchingUser && !fetchingPlaylists ? (
          <div className="app-playlists">
            <Header />
            <UserAvatar user={user} />
            <div className="d-flex justify-content-center">
              <PlaylistCounter playlists={playlistToRender} />
              <HoursCounter playlists={playlistToRender} />
              <Followers user={user} />
            </div>
            <SearchFilter
              onTextChange={text => this.setState({ filterString: text })}
            />
            <PlaylistListing
              user={user}
              playlists={playlists}
              playlistToRender={playlistToRender}
            />
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default Dashboard;
