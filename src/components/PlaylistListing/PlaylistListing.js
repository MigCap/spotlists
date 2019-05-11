import React, { Fragment } from 'react';

import PlaylistCard from './PlaylistCard';

export default function PlaylistListing(props) {
  const { playlistToRender } = props;

  return (
    <Fragment>
      <div className="app-playlists">
        <div className="mt-lg-5">
          <div className="row align-items-center justify-content-start no-gutters mt-5 mb-4">
            <div className="col-12 col-md-4 align-self-center">
              <h5 className="text-white font-weight-bold">Your Playlists</h5>
            </div>
          </div>

          {playlistToRender && playlistToRender.length !== 0 ? (
            playlistToRender.map((playlist, index) => (
              <PlaylistCard playlist={playlist} key={index} />
            ))
          ) : (
            <div className="mt-5 text-white">
              <h6>No playlists or songs matching the search</h6>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
