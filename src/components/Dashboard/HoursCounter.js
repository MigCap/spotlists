import React, { Component } from 'react';

export default class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs);
    }, []);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration;
    }, 0);
    return (
      <div className="text-success mx-4">
        <h6 className="font-weight-bolder mb-1">
          {Math.round(totalDuration / 60)}
        </h6>
        <h6 className="text-muted text-uppercase small-font"> hours</h6>
      </div>
    );
  }
}
