import React from 'react';

import PlaylistCard from './PlaylistCard';

export default function PlaylistListing(props) {
  const { playlistToRender } = props;

  return (
    <div className="playlists-container">
      <div className="row align-items-center justify-content-start no-gutters pt-5 pb-4">
        <div className="col-12 col-lg-3 pl-lg-2 align-self-center">
          <h5 className="text-white font-weight-bold pt-lg-5">
            Your Playlists
          </h5>
        </div>
      </div>

      {playlistToRender && playlistToRender.length !== 0 ? (
        playlistToRender.map((playlist, index) => (
          <PlaylistCard playlist={playlist} key={index} />
        ))
      ) : (
        <div className="pt-5 text-white">
          <h6>No playlists or songs matching the search</h6>
        </div>
      )}
    </div>
  );
}
