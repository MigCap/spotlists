import React from "react";

import PlaylistCard from "../PlaylistCard/PlaylistCard";

export default function PlaylistListing(props) {
  const { playlistToRender } = props;

  return (
    <div className="playlists-container pt-5 mx-auto">
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
