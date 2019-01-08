import React, { Component } from 'react';

let defaultTextColor = 'success';
let defaultStyle = {
  color: defaultTextColor
};

export default class PlaylistCounter extends Component {
  render() {
    return (
      <div
        className=""
        style={{
          ...defaultStyle,
          width: '40%',
          display: 'inline-block',
          color: 'white'
        }}>
        <h6>{this.props.playlists.length} Playlists</h6>
      </div>
    );
  }
}
