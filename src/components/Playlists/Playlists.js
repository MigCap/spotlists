import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getPlaylists } from '../../app/spotify';
import { catchErrors } from '../../app/helpers';

import { IconMusic } from '../icons';

import Loader from '../Loader/Loader';

class Playlists extends Component {
  state = {
    playlists: null,
    isFetching: true
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { data } = await getPlaylists();
    this.setState({ playlists: data, isFetching: false });
  }

  render() {
    const { playlists, isFetching } = this.state;
    // console.log(playlists);
    return (
      <div className="app-playlists px-5">
        <h2 className="text-muted text-center mt-2 mb-5">Your Playlists</h2>
        <div className="playlists-wrapper">
          <div className="playlists-grid">
            {playlists && !isFetching ? (
              playlists.items.map(({ id, images, name, tracks }, i) => (
                <div className="playlist-container" key={i}>
                  <Link
                    className="playlist-img-container"
                    to={`/playlists/${id}`}>
                    {images.length ? (
                      <img
                        className="playlists-imgs"
                        src={images[0].url}
                        alt="Album Art"
                      />
                    ) : (
                      <div>
                        <IconMusic />
                      </div>
                    )}
                    <div className="playlists-mask">
                      <i className="fas fa-info-circle" />
                    </div>
                  </Link>
                  <div className="pt-2">
                    <Link
                      className="playlist-name d-inline-block text-white m-0 p-0"
                      to={`/playlists/${id}`}>
                      {name}
                    </Link>
                    <p className="playlist-totaltracks text-muted small-font m-0 p-0">
                      {tracks.total} Tracks
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Playlists;
