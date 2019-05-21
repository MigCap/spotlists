import React from 'react';
import { Link } from 'react-router-dom';

import { formatDuration } from '../../app/helpers';

// import { IconInfo } from '../icons';

const TrackItem = ({ track }) => {
  return (
    <li className="">
      <div className="trackContainer row align-items-center justify-content-end pb-3 mx-2">
        <div className="trackArtwork col-2 col-sm-2 align-self-start m-0 p-0 pt-1">
          {track.album.images.length && (
            <img
              className="img-fluid"
              src={track.album.images[1].url}
              alt="Album Artwork"
            />
          )}
        </div>

        <div className="col-8 col-sm-8 align-self-start trackLeft text-left m-0 p-0 pl-3">
          {track.name && <p className="text-white m-0 p-0">{track.name}</p>}
          {track.artists && track.album && (
            <p className="trackAlbum text-muted">
              {track.artists &&
                track.artists.map(({ name }, i) => (
                  <Link
                    key={i}
                    to={{
                      pathname: `/artist/${name[0].id}`,
                      state: { artistName: name[0].name }
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
              <Link to={`/track/${track.id}`} className="text-muted small-font">
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
