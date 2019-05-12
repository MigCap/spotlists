import React, { Component } from 'react';

export default class SearchFilter extends Component {
  render() {
    const { onTextChange } = this.props;

    return (
      <div className="container mt-4 mx-auto">
        <input
          className="form-control form-control-sm mx-auto py-3 round-corner"
          type="text"
          placeholder="Search Playlist or Song"
          onKeyUp={event => onTextChange(event.target.value)}
        />
      </div>
    );
  }
}
