import React from 'react';

const Followers = props => (
  <div className="text-success mx-2">
    <h6 className="font-weight-bolder mb-1">{props.followers}</h6>
    <h6 className="text-muted text-uppercase small-font">Followers</h6>
  </div>
);

export default Followers;
