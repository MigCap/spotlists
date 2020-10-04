import React, { Component } from "react";

import "./SearchFilter.scss";

export default class SearchFilter extends Component {
  render() {
    const { onTextChange } = this.props;

    return (
      <div className="pt-3 mx-auto sticky-search">
        <input
          className="form-control form-control-sm mx-auto pt-1 pb-2 round-corner"
          type="text"
          placeholder="Search Playlist or Song"
          onKeyUp={(event) => onTextChange(event.target.value)}
        />
      </div>
    );
  }
}
