import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  getTopTracksShort,
  getTopTracksMedium,
  getTopTracksLong
} from '../../app/spotify';
import { catchErrors, formatDuration } from '../../app/helpers';

import { IconMusic } from '../icons';
import Loader from '../Loader/Loader';

class TopTracks extends Component {
  state = {
    topTracks: null,
    isFetching: true,
    activeRange: 'long'
  };

  apiCalls = {
    long: getTopTracksLong(),
    medium: getTopTracksMedium(),
    short: getTopTracksShort()
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { data } = await getTopTracksLong();
    this.setState({ topTracks: data.items, isFetching: false });
  }

  async changeRange(range) {
    const { data } = await this.apiCalls[range];
    this.setState({ topTracks: data.items, activeRange: range });
  }

  setActiveRange = range => catchErrors(this.changeRange(range));

  render() {
    const { topTracks, isFetching, activeRange } = this.state;

    return (
      <div className="app-playlists">
        <h2 className="title-font text-white text-center py-4 pb-3">
          Top Tracks
        </h2>

        <div className="tracks-range text-center text-md-right pb-5 px-4">
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

        {topTracks && !isFetching ? (
          topTracks.map(({ name, album, href, artists, duration_ms }, i) => {
            return (
              <div
                className="row align-items-center justify-content-end no-gutters tracks-names pb-4"
                key={i}>
                <div className="col-2 col-sm-2 align-self-start pt-1">
                  <Link
                    className="playlist-img-container pl-2"
                    to={`/album/${album.id}`}>
                    {album.images.length ? (
                      <img
                        className="album-track-img img-fluid"
                        src={album.images[0].url}
                        alt={name}
                      />
                    ) : (
                      <div className="icon-music">
                        <IconMusic />
                      </div>
                    )}
                  </Link>
                </div>
                <div className="col-8 col-sm-8 align-self-start text-left pl-4">
                  <p className="m-0 p-0 text-white"> {name} </p>
                  <p className="m-0 p-0 text-muted">
                    <Link
                      to={{
                        pathname: `/artist/${artists[0].id}`,
                        state: { artistName: artists[0].name }
                      }}
                      className="text-muted">
                      {artists[0].name}
                    </Link>{' '}
                    - {album.name}
                  </p>
                </div>
                <div className="col-2 col-sm-2 align-self-start">
                  <p className="d-block text-muted text-center small-font">
                    {formatDuration(duration_ms)}{' '}
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

export default TopTracks;
