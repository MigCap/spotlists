import React from 'react';
import { Link } from 'react-router-dom';

import { formatDuration } from '../../app/helpers';

// import { IconInfo } from '../icons';

const TrackItem = ({ track }) => {
  return (
    <li className="">
      <Link to={`/track/${track.id}`}>
        <div className="trackContainer row align-items-center justify-content-end pb-3">
          <div className="trackArtwork col-2 col-sm-2 m-0 p-0">
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
              <p className="trackAlbum text-muted small-font ">
                {track.artists &&
                  track.artists.map(({ name }, i) => (
                    <span className="" key={i}>
                      {name}
                      {track.artists.length > 0 &&
                      i === track.artists.length - 1
                        ? ''
                        : ','}
                      &nbsp;
                    </span>
                  ))}
                &nbsp;&middot;&nbsp;&nbsp;
                {track.album.name}
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
      </Link>
    </li>
  );
};

export default TrackItem;
