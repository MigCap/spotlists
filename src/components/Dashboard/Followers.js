import React, { Component } from 'react';

export default class Followers extends Component {
  render() {
    return (
      <div className="text-success mx-2">
        <h6 className="font-weight-bolder mb-1">{this.props.user.followers}</h6>
        <h6 className="text-muted text-uppercase small-font">Followers</h6>
      </div>
    );
  }
}
