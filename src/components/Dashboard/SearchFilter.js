import React, { Component } from 'react';

export default class SearchFilter extends Component {
  render() {
    return (
      <div className="container m-b-3">
        <input
          className="container form-control form-control-sm mt-2 round-corner"
          type="text"
          placeholder="Search Playlist or Top Songs"
          onKeyUp={event => this.props.onTextChange(event.target.value)}
        />
      </div>
    );
  }
}
