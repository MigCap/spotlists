import React, { Component } from "react";

import { getRecentlyPlayed } from "../../app/spotify";
import { catchErrors } from "../../app/helpers";

import TrackItem from "../../components/TrackItem/TrackItem";

import Loader from "../../components/Loader/Loader";

class Recent extends Component {
  state = {
    recentlyPlayed: null,
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { data } = await getRecentlyPlayed();
    this.setState({ recentlyPlayed: data });
  }

  render() {
    const { recentlyPlayed } = this.state;

    return (
      <div className="app-playlists">
        <h2 className="title-font text-white text-center py-4 pb-5">
          Recent Activity
        </h2>
        <div className="recently-played-container">
          <ul className="list-unstyled">
            {recentlyPlayed ? (
              recentlyPlayed.items.map(({ track }, i) => (
                <TrackItem track={track} key={i} />
              ))
            ) : (
              <Loader />
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Recent;
