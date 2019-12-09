import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { setPlaylistName, getTrackMinutesSeconds } from '../../app/helpers';

class PlaylistCard extends Component {
  render() {
    const { playlist } = this.props;
    return (
      <div className="row justify-content-center no-gutters pb-3 px-md-5">
        <div className="co-12 col-sm-2 align-self-start pt-sm-3 pl-sm-4">
          <Link
            to={`/playlists/${playlist.id}`}
            alt={`Spotify Playlist: ${setPlaylistName(playlist.name)}`}>
            <img
              className="playlist-img img-flex"
              alt={`Spotify Playlist: ${setPlaylistName(playlist.name)}`}
              src={playlist.imageUrl}
            />
          </Link>
        </div>

        <div className="col-12 col-sm-10 px-5 px-sm-3 pt-3 pt-sm-0 pb-4 pb-sm-0 pr-md-4">
          <div className="pb-1 text-sm-left">
            <Link
              to={`/playlists/${playlist.id}`}
              alt={`Spotify Playlist: ${setPlaylistName(playlist.name)}`}
              className="text-white font-weight-bold">
              <p className="dasboard-playlist-title title-font m-0 p-0">
                {setPlaylistName(playlist.name)}&nbsp;&nbsp;&nbsp;
                <span className="text-muted small-font">
                  {`${playlist.totalTracks} Tracks`}
                </span>
              </p>
            </Link>
          </div>

          <div className="">
            {playlist.songs.map((song, index) => (
              <div className="row pb-1" key={index}>
                <div className="col-10">
                  <div>
                    <p className="text-muted text-left small-font m-0">
                      {song.trackName}
                    </p>
                    <p className="text-muted text-left text-truncate small-font m-0">
                      <Link
                        className="text-white"
                        to={{
                          pathname: `/artist/${song.artistId}`,
                          state: { artistName: song.artistName }
                        }}>
                        {song.artistName}
                      </Link>{' '}
                      - {song.albumTitle}
                    </p>
                  </div>
                </div>
                <div className="col-2 pl-0 align-self-start">
                  <p className="text-muted text-right small-font m-0 p-0">
                    {getTrackMinutesSeconds(song.duration)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default PlaylistCard;
