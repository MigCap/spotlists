import React from 'react';
import { Link } from 'react-router-dom';

import { formatDuration } from 'app/helpers';

import './TrackItem.scss';

const TrackItem = ({ track }) => {
  return (
    <li className="">
      <div className="trackContainer row align-items-center justify-content-end pb-3 mx-2">
        <div className="col-2 col-sm-2 align-self-start trackArtwork m-0 p-0 pt-1">
          {track.album.images.length && (
            <Link
              className="playlist-img-container pl-2"
              to={{
                pathname: `/album/${track.album.id}`,
                state: { albumId: track.album.id }
              }}>
              <img
                className="img-fluid track-item-img"
                src={track.album.images[1].url}
                alt="Album Artwork"
              />
            </Link>
          )}
        </div>

        <div className="col-8 col-sm-8 align-self-start trackLeft text-left m-0 p-0 pl-4 pl-lg-5">
          {track.name && <p className="text-white m-0 p-0">{track.name}</p>}
          {track.artists && track.album && (
            <p className="trackAlbum text-muted">
              {track.artists &&
                track.artists.map(({ name, id }, i) => (
                  <Link
                    key={i}
                    to={{
                      pathname: `/artist/${id}`,
                      state: { artistName: name }
                    }}
                    className="text-muted">
                    <span className="small-font">
                      {name}
                      {track.artists.length > 0 &&
                      i === track.artists.length - 1
                        ? ''
                        : ','}
                      &nbsp;
                    </span>
                  </Link>
                ))}
              &nbsp;&middot;&nbsp;&nbsp;
              <Link
                to={{
                  pathname: `/album/${track.album.id}`,
                  state: { albumId: track.album.id }
                }}
                className="text-muted small-font">
                {track.album.name}
              </Link>
            </p>
          )}
        </div>
        <div className="col-2 col-sm-2 align-self-start trackRight text-muted text-left">
          {track.duration_ms && (
            <p className="small-font p-0 m-0 pt-1">
              {formatDuration(track.duration_ms)}
            </p>
          )}
        </div>
      </div>
    </li>
  );
};

export default TrackItem;
