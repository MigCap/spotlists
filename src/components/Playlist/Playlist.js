import React, { Component } from 'react';
import { getPlaylist, getAudioFeaturesForTracks } from '../../app/spotify';
import { catchErrors } from '../../app/helpers';

export default class Playlist extends Component {
  state = {
    playlist: null,
    tracks: null,
    audioFeatures: null
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { playlistId } = this.props.match.params;
    const { data } = await getPlaylist(playlistId);
    this.setState({ playlist: data });
    console.log(this.state.playlist);

    if (data) {
      const { playlist } = this.state;
      const { data } = await getAudioFeaturesForTracks(playlist.tracks.items);
      this.setState({ audioFeatures: data });
    }
  }
  render() {
    return (
      <div>
        <h1 className="text-muted text-center mt-5">Playlist</h1>
      </div>
    );
  }
}
