import React, { Component } from 'react';

class PlaylistCard extends Component {
  getTrackMinutesSeconds = trackDuration => {
    let minutes = parseInt(Math.floor(trackDuration / 60));
    let seconds = parseInt(trackDuration - minutes * 60);
    return `${minutes} : ${seconds}`;
  };
  setPlaylistName(playlistString) {
    return (
      playlistString.charAt(0).toUpperCase() +
      playlistString.toLowerCase().slice(1)
    );
  }

  render() {
    const { playlist } = this.props;
    return (
      <div className="row align-items-center justify-content-start no-gutters mb-4">
        <div className="col-4 col-md-2 align-self-center">
          <a
            href={playlist.externalUrl}
            alt={`Spotify Playlist: ${this.setPlaylistName(playlist.name)}`}
            target="_blank"
            rel="noopener noreferrer">
            <img
              className="rounded-circle playlist-img"
              alt={`Spotify Playlist: ${this.setPlaylistName(playlist.name)}`}
              src={playlist.imageUrl}
            />
          </a>
        </div>
        <div className="col-8 col-md-9 text-left">
          <div className="text-white font-weight-bold mb-1">
            <a
              className="text-white"
              href={playlist.externalUrl}
              target="_blank"
              rel="noopener noreferrer">
              {this.setPlaylistName(playlist.name)}
            </a>{' '}
            -
            <span className="text-muted small-font ml-1">
              {`${playlist.totalTracks} Tracks`}
            </span>
          </div>
          <div className="row">
            <div className="col-7 col-sm-7 col-md-9">
              {playlist.songs.map((song, index) => (
                <p
                  className="text-muted text-truncate small-font m-0"
                  key={index}>
                  <span className="text-white">{song.artistName}</span> ·{' '}
                  {song.trackName} ({song.albumTitle})
                </p>
              ))}
            </div>
            <div className="col-5 col-sm-5 col-md-3 align-self-end">
              {playlist.songs.map((song, index) => (
                <p
                  className="text-muted text-right small-font m-0 mr-sm-3"
                  key={index}>
                  {this.getTrackMinutesSeconds(song.duration)}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlaylistCard;
