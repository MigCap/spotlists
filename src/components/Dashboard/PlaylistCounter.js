import React, { Component } from 'react';

export default class PlaylistCounter extends Component {
  render() {
    return (
      <div className="text-success mx-4">
        <h6 className="font-weight-bolder mb-0">
          {this.props.playlists.length}
        </h6>
        <h6 className="text-muted text-uppercase small-font">Playlists</h6>
      </div>
    );
  }
}
