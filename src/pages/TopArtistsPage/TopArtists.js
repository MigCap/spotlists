import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  getTopArtistsShort,
  getTopArtistsMedium,
  getTopArtistsLong
} from '../../app/spotify';
import { catchErrors, formatWithCommas } from '../../app/helpers';

import { IconMusic } from '../../assets/icons';

import Loader from '../../components/Loader/Loader';

class TopArtists extends Component {
  state = {
    topArtists: null,
    activeRange: 'long',
    isFetching: true
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
    const { data } = await getTopArtistsLong();
    this.setState({ topArtists: data.items, isFetching: false });
  }

  async changeRange(range) {
    const { data } = await this.apiCalls[range];
    this.setState({ topArtists: data.items, activeRange: range });
  }

  setActiveRange = range => catchErrors(this.changeRange(range));

  render() {
    const { topArtists, activeRange, isFetching } = this.state;
    return (
      <div className="app-playlists">
        <h2 className="title-font text-white text-center py-4 pb-4">
          Top Artists
        </h2>

        <div className="tracks-range text-center text-md-right pb-3 px-4">
          <button
            className={
              activeRange === 'long' ? 'buttons-range-active' : 'buttons-range'
            }
            onClick={() => this.setActiveRange('long')}>
            All Time
          </button>
          <button
            className={
              activeRange === 'medium'
                ? 'buttons-range-active'
                : 'buttons-range'
            }
            onClick={() => this.setActiveRange('medium')}>
            <span>Last 6 months</span>
          </button>
          <button
            className={
              activeRange === 'short' ? 'buttons-range-active' : 'buttons-range'
            }
            onClick={() => this.setActiveRange('short')}>
            <span>Last 4 weeks</span>
          </button>
        </div>

        {topArtists && !isFetching ? (
          topArtists.map(({ id, name, images, followers, genres }, i) => {
            return (
              <div
                className="row align-items-center justify-content-end no-gutters pl-4"
                key={i}>
                <div className="col-3 col-sm-3">
                  <Link
                    className="playlist-img-container pl-2"
                    to={`/artist/${id}`}>
                    {images.length ? (
                      <img
                        className="rounded-circle artists-img d-block ml-auto mr-4"
                        src={images[0].url}
                        alt={name}
                      />
                    ) : (
                      <div className="icon-music">
                        <IconMusic />
                      </div>
                    )}
                  </Link>
                </div>
                <div className="col-9 col-sm-9 align-self-center text-left pl-2 pr-2">
                  <p className="text-white m-0 p-0">
                    <Link
                      className="text-white"
                      to={{
                        pathname: `/artist/${id}`,
                        state: { artistName: name }
                      }}>
                      {name}&nbsp;&nbsp;
                    </Link>
                  </p>
                  <p className="text-muted text-uppercase m-0 p-0">
                    {genres &&
                      genres.map((genre, i) => {
                        if (i <= 0) {
                          return (
                            <span className="text-muted small-font" key={genre}>
                              {genre}
                            </span>
                          );
                        } else {
                          return '';
                        }
                      })}
                  </p>
                  <p className="text-muted small-font m-0 pt-1">
                    {' '}
                    {formatWithCommas(followers.total)} followers
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default TopArtists;
