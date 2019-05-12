import React, { Component } from 'react';

class PlaylistCard extends Component {
  getTrackMinutesSeconds = trackDuration => {
    let minutes = parseInt(Math.floor(trackDuration / 60));
    let seconds = parseInt(trackDuration - minutes * 60);
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
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
      <div className="row align-items-center justify-content-center no-gutters pb-2">
        <div className="col-4 col-md-2 align-self-start pt-1">
          <a
            href={playlist.externalUrl}
            alt={`Spotify Playlist: ${this.setPlaylistName(playlist.name)}`}
            target="_blank"
            rel="noopener noreferrer">
            <img
              className="playlist-img"
              alt={`Spotify Playlist: ${this.setPlaylistName(playlist.name)}`}
              src={playlist.imageUrl}
            />
          </a>
        </div>
        <div className="col-12 col-md-9 text-left pb-1">
          <div className="row justify-content-center">
            <div className="col-11 col-md-12">
              <div className="text-white font-weight-bold pb-1">
                <a
                  className="text-white"
                  href={playlist.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  {this.setPlaylistName(playlist.name)}
                </a>{' '}
                <span className="text-muted small-font pl-1">
                  {`${playlist.totalTracks} Tracks`}
                </span>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-11 col-md-12">
              {playlist.songs.map((song, index) => (
                <div className="row pb-2" key={index}>
                  <div className="col-10 col-sm-7 col-md-9">
                    <div>
                      <p className="small-font m-0">
                        <span className="text-muted">{song.trackName}</span>
                      </p>
                      <p className="text-muted text-truncate small-font m-0">
                        <span className="text-white">{song.artistName}</span> -{' '}
                        {song.albumTitle}
                      </p>
                    </div>
                  </div>
                  <div className="col-2 col-sm-5 col-md-3 pl-0 align-self-start">
                    <p className="text-muted text-right small-font m-0 p-0">
                      {this.getTrackMinutesSeconds(song.duration)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlaylistCard;
