import React, { Component, Fragment } from 'react';

import {
  getArtist,
  followArtist,
  doesUserFollowArtist
} from '../../app/spotify';
import {
  catchErrors,
  formatWithCommas,
  setPlaylistName
} from '../../app/helpers';

import Loader from '../Loader/Loader';
export default class Artist extends Component {
  state = {
    artist: null,
    isFollowing: null
  };

  componentDidMount() {
    catchErrors(this.getData());
    catchErrors(this.isFollowing());
  }

  async getData() {
    const { artistId } = this.props.match.params;
    const { data } = await getArtist(artistId);
    this.setState({ artist: data });
  }

  isFollowing = async () => {
    const { artistId } = this.props.match.params;
    const { data } = await doesUserFollowArtist(artistId);
    this.setState({ isFollowing: data[0] });
  };

  follow = async () => {
    const { artistId } = this.props;
    await followArtist(artistId);
    this.isFollowing();
  };

  render() {
    const { artist, isFollowing } = this.state;

    return (
      <Fragment>
        {artist ? (
          <div className="app-playlists">
            <div className="row justify-content-start ml-3 pt-4">
              <div className="col-11 col-sm-5 pl-3">
                {artist.images.length && (
                  <div className="artist-cover mb-2">
                    <img
                      className="img-fluid"
                      src={artist.images[1].url}
                      alt={artist.name}
                    />
                  </div>
                )}

                <h3 className="text-white font-weight-bolder mb-0">
                  {setPlaylistName(artist.name)}
                </h3>

                <p className="text-muted small-font m-0 p-0 pt-2">
                  {formatWithCommas(artist.followers.total)}
                </p>
                <p className="text-muted text-uppercase small-font m-0 p-0">
                  Followers
                </p>

                <button
                  className="btn-custom text-white mt-3"
                  onClick={catchErrors(this.follow)}>
                  {isFollowing ? 'Following Artist' : 'Follow Artist'}
                </button>
              </div>

              <div className="col-11 col-sm-7 pr-sm-5">
                {artist.genres && (
                  <div className="artist-stats">
                    <p className="text-muted small-font m-0 p-0">Genres</p>

                    {artist.genres.map(genre => (
                      <p
                        className="text-white text-uppercase m-0 p-0"
                        key={genre}>
                        {genre}
                      </p>
                    ))}
                  </div>
                )}
                {artist.popularity && (
                  <div className="artist-stats mt-4">
                    <p className="text-muted small-font m-0 p-0">Popularity</p>

                    <p className="text-white m-0 p-0">{artist.popularity}%</p>
                  </div>
                )}
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
