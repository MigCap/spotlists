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
      <div className="row align-items-center justify-content-start no-gutters mb-5">
        <div className="col-2 align-self-center">
          <img
            className="img-fluid rounded-circle playlist-img"
            alt=""
            src={playlist.imageUrl}
          />
        </div>
        <div className="col-9 text-left align-self-start">
          <p className="text-white font-weight-bold mb-1">
            {this.setPlaylistName(playlist.name)}
          </p>
          <div className="row">
            <div className="col-6">
              {playlist.songs.map((song, index) => (
                <p className="text-muted small-font m-0" key={index}>
                  {song.name}
                </p>
              ))}
            </div>
            <div className="col-6">
              {playlist.songs.map((song, index) => (
                <p className="text-muted small-font m-0" key={index}>
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
