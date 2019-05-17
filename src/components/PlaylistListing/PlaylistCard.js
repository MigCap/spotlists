import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { setPlaylistName, getTrackMinutesSeconds } from '../../app/helpers';

class PlaylistCard extends Component {
  render() {
    const { playlist } = this.props;
    return (
      <div className="row justify-content-center no-gutters pb-3">
        <div className="col-4 col-md-2 align-self-start pt-1">
          <Link
            to={playlist.id}
            alt={`Spotify Playlist: ${setPlaylistName(playlist.name)}`}>
            <img
              className="playlist-img"
              alt={`Spotify Playlist: ${setPlaylistName(playlist.name)}`}
              src={playlist.imageUrl}
            />
          </Link>
        </div>
        <div className="col-12 col-md-9 text-left pb-1">
          <div className="row justify-content-center">
            <div className="col-11 col-md-12">
              <div className="text-white font-weight-bold pb-1">
                <Link
                  to={playlist.id}
                  alt={`Spotify Playlist: ${setPlaylistName(playlist.name)}`}
                  className="text-white font-weight-bold">
                  {setPlaylistName(playlist.name)}{' '}
                  <span className="text-muted small-font pl-1">
                    {`${playlist.totalTracks} Tracks`}
                  </span>
                </Link>
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
                        <span className="text-white">{song.trackName}</span>
                      </p>
                      <p className="text-muted text-truncate small-font m-0">
                        {song.artistName} - {song.albumTitle}
                      </p>
                    </div>
                  </div>
                  <div className="col-2 col-sm-5 col-md-3 pl-0 align-self-start">
                    <p className="text-muted text-right small-font m-0 p-0">
                      {getTrackMinutesSeconds(song.duration)}
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
