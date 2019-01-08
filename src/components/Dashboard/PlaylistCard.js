import React, { Component } from 'react';

class PlaylistCard extends Component {
  render() {
    const { playlist } = this.props;
    return (
      <div
        className="card col-12 col-md-6 col-lg-4 no-border"
        style={{
          display: 'inline-block',
          width: '40%'
        }}>
        <img
          className="card-img-top mt-5"
          alt=""
          src={playlist.imageUrl}
          style={{ width: '120px' }}
        />
        <div className="card-body">
          <h3 className="card-title text-white">{playlist.name}</h3>
          <ul className="list-group list-group-flush">
            {playlist.songs.map((song, index) => (
              <li className="list-group-item" key={index}>
                {song.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default PlaylistCard;
