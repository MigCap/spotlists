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
        <h1 className="text-white text-center my-5">Your Playlists</h1>
        <div className="playlists-wrapper">
          <div className="playlists-grid">
            {playlists && !isFetching ? (
              playlists.items.map(({ id, images, name, tracks }, i) => (
                <div className="playlist-container" key={i}>
                  <div className="playlist-img-container" to={id}>
                    {images.length ? (
                      <img src={images[0].url} alt="Album Art" />
                    ) : (
                      <div>
                        <div>
                          <IconMusic />
                        </div>
                      </div>
                    )}
                    <div className="playlists-mask">
                      <i className="fas fa-info-circle" />
                    </div>
                  </div>
                  <div className="pt-2">
                    <Link
                      className="playlist-name d-inline-block text-white text-truncate"
                      to={id}>
                      {name}
                    </Link>
                    <div className="playlist-totaltracks text-muted">
                      {tracks.total} Tracks
                    </div>
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
