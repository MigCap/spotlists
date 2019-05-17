import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  getTopArtistsShort,
  getTopArtistsMedium,
  getTopArtistsLong
} from '../../app/spotify';
import { catchErrors } from '../../app/helpers';

import { IconMusic } from '../icons';

class TopArtists extends Component {
  state = {
    topArtists: [],
    activeRange: 'long'
  };

  apiCalls = {
    long: getTopArtistsLong(),
    medium: getTopArtistsMedium(),
    short: getTopArtistsShort()
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { data } = await getTopArtistsMedium();
    this.setState({ topArtists: data.items });
  }

  async changeRange(range) {
    const { data } = await this.apiCalls[range];
    this.setState({ topArtists: data, activeRange: range });
  }

  setActiveRange = range => catchErrors(this.changeRange(range));

  render() {
    const { topArtists } = this.state;
    return (
      <div className="app-playlists">
        <h1 className="text-muted text-center py-4 pb-5">Top Artists</h1>

        {topArtists &&
          topArtists.map(({ id, name, images, followers, genres }, i) => {
            return (
              <div
                className="row align-items-center justify-content-end no-gutters pb-4"
                key={i}>
                <div className="col-2">
                  <Link className="playlist-img-container pl-2" to={id}>
                    {images.length ? (
                      <img
                        className="rounded-circle artists-img"
                        src={images[0].url}
                        alt={name}
                      />
                    ) : (
                      <div>
                        <div>
                          <IconMusic />
                        </div>
                      </div>
                    )}
                  </Link>
                </div>
                <div className="col-10 align-self-center text-left">
                  <Link to={id}>
                    <p className="text-white m-0 p-0">
                      {name} -{' '}
                      {genres &&
                        genres.map((genre, i) => {
                          if (i <= 2) {
                            return (
                              <span className="text-muted small-font">
                                {genre} |{' '}
                              </span>
                            );
                          }
                        })}
                    </p>
                    <p className="text-muted small-font m-0 p-0">
                      {' '}
                      {followers.total} followers
                    </p>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default TopArtists;
