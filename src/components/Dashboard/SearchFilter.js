import React, { Component } from 'react';

export default class SearchFilter extends Component {
  render() {
    return (
      <div className="container mt-4">
        <input
          className="form-control form-control-sm mx-auto py-3 round-corner"
          type="text"
          placeholder="Search Playlist or Song"
          onKeyUp={event => this.props.onTextChange(event.target.value)}
        />
      </div>
    );
  }
}
