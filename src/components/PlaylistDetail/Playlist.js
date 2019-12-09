import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { getPlaylist, getAudioFeaturesForTracks } from '../../app/spotify';
import { catchErrors, setPlaylistName } from '../../app/helpers';

import TrackItem from '../TrackItem/TrackItem';

import Loader from '../Loader/Loader';

export default class Playlist extends Component {
  state = {
    playlist: null,
    tracks: null,
    audioFeatures: null
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { playlistId } = this.props.match.params;
    const { data } = await getPlaylist(playlistId);
    this.setState({ playlist: data });

    if (data) {
      const { playlist } = this.state;
      const { data } = await getAudioFeaturesForTracks(playlist.tracks.items);
      this.setState({ audioFeatures: data });
    }
  }
  render() {
    const { playlist } = this.state;

    return (
      <Fragment>
        {playlist ? (
          <div className="app-playlists">
            <div className="row justify-content-start playlist-container">
              <div className="col-12 col-lg-4 playlist-left pl-3 px-3">
                {playlist.images.length && (
                  <div className="playlist-cover mb-2">
                    <img
                      className="img-fluid"
                      src={playlist.images[0].url}
                      alt="Album Art"
                    />
                  </div>
                )}
                <a
                  className="playlist-title text-white mb-0"
                  href={playlist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer">
                  <h4 className="">{setPlaylistName(playlist.name)}</h4>
                </a>
                <p className="text-muted small-font m-0 p-0">
                  By{' '}
                  {playlist.owner.display_name
                    ? setPlaylistName(playlist.owner.display_name)
                    : setPlaylistName(playlist.owner.id)}
                </p>
                <p className="text-muted small-font m-0 p-0">
                  {playlist.tracks.total} Tracks
                </p>
                <Link
                  to={`/recomendations/${playlist.id}`}
                  className="btn-custom mt-3">
                  Get Recommendations
                </Link>
              </div>

              <div className="col-12 col-lg-8 playlist-right">
                <ul className="list-unstyled">
                  {playlist.tracks &&
                    playlist.tracks.items.map(({ track }, i) => (
                      <TrackItem track={track} key={i} />
                    ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </Fragment>
    );
  }
}
