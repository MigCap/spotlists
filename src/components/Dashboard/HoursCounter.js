import React, { Component } from 'react';

let defaultTextColor = 'success';
let defaultStyle = {
  color: defaultTextColor
};

export default class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs);
    }, []);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration;
    }, 0);
    return (
      <div
        className=""
        style={{
          ...defaultStyle,
          width: '40%',
          display: 'inline-block',
          color: 'white'
        }}>
        <h6>{Math.round(totalDuration / 60)} hours</h6>
      </div>
    );
  }
}
