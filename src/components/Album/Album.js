import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { getAlbum } from '../../app/spotify';
import { catchErrors, formatDuration, formatString } from '../../app/helpers';

import Loader from '../Loader/Loader';
class Album extends Component {
  state = {
    album: null
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { albumId } = this.props.location.state;
    const { data } = await getAlbum(albumId);
    this.setState({ album: data });
  }

  render() {
    const { album } = this.state;

    return (
      <div className="app-playlists">
        <Fragment>
          {album ? (
            <div className="app-albums pt-4">
              <div className="row justify-content-start album-container">
                <div className="col-12 col-lg-4 mb-5 mb-lg-0 pl-lg-5">
                  {album.images.length && (
                    <div className="album-cover mb-2">
                      <img
                        className="img-fluid"
                        src={album.images[0].url}
                        alt={album.name}
                      />
                    </div>
                  )}
                  <h4 className="title-font text-white font-weight-bold mb-2">
                    {album.name}
                  </h4>

                  <p className="text-muted small-font m-0 p-0">
                    By{' '}
                    {album.artists &&
                      album.artists.map(({ name, id }, i) => (
                        <Link
                          key={i}
                          to={{
                            pathname: `/artist/${id}`,
                            state: { artistName: name }
                          }}
                          className="text-muted">
                          <span key={i}>
                            {name}
                            {album.artists.length > 0 &&
                            i === album.artists.length - 1
                              ? ''
                              : ', '}
                            &nbsp;
                          </span>
                        </Link>
                      ))}
                    <span>&nbsp;({album.release_date})</span>
                  </p>
                  <p className="text-muted small-font m-0 p-0">
                    {formatString(album.type)} - {album.total_tracks} Tracks
                  </p>
                  <a
                    href={album.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-custom mt-3 px-5">
                    Play
                  </a>
                </div>

                <div className="col-12 col-lg-8 px-4 px-md-5">
                  <h5 className="title-font text-white text-left pb-4">
                    {album.artists &&
                      album.artists.map(({ name, id }, i) => (
                        <Link
                          key={i}
                          to={{
                            pathname: `/artist/${id}`,
                            state: { artistName: name }
                          }}
                          className="text-success">
                          <span key={i}>
                            {name}
                            {album.artists.length > 0 &&
                            i === album.artists.length - 1
                              ? ''
                              : ', '}
                            &nbsp;
                          </span>
                        </Link>
                      ))}
                    &nbsp;&nbsp;-&nbsp;&nbsp;{album.name}
                  </h5>
                  <ul className="list-unstyled">
                    {album.tracks &&
                      album.tracks.items.map((track, i) => (
                        <li key={i}>
                          <div className="row align-items-center justify-content-start pb-1">
                            <div className="col-9 col-sm-9 align-self-start text-left m-0 p-0 pl-3">
                              <p className="text-white">{track.name}</p>
                            </div>
                            <div className="col-3 col-sm-3 align-self-start text-muted text-center">
                              {track.duration_ms && (
                                <p className="small-font p-0 m-0 pt-1">
                                  {formatDuration(track.duration_ms)}
                                </p>
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </Fragment>
      </div>
    );
  }
}

export default Album;
