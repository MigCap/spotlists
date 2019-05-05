import React, { Fragment } from 'react';

import PlaylistCard from './PlaylistCard';

export default function PlaylistListing(props) {
  const { playlistToRender } = props;

  return (
    <Fragment>
      <div className="app-playlists">
        <div className="container mt-lg-5">
          <div className="row align-items-center justify-content-start no-gutters mt-5 mb-4">
            <div className="col-6 col-sm-5 col-md-3 align-self-center">
              <h5 className="text-white font-weight-bold text-center">
                Your Playlists
              </h5>
            </div>
          </div>

          {playlistToRender && playlistToRender.length !== 0 ? (
            playlistToRender.map((playlist, index) => (
              <PlaylistCard playlist={playlist} key={index} />
            ))
          ) : (
            <div className="mt-5 text-white">
              <h6>No playlists or tracks matching the search</h6>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
