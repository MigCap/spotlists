import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <div className="text-center p-3 app-login">
        <div className="container logo img-fluid pb-3">
          <img src="Spotify_Logo_CMYK_Black.png" alt="spotify logo" />
          <hr />
        </div>

        <div className="container">
          <h2 className="text-success">SPOTIFY TOP PLAYLIST'S TRACKS</h2>
        </div>

        <div className="container pt-4">
          <h6 className="bold">
            A simple react app which lists your playlist and the total amount of
            hours of them, showing 3 top tracks from each one.
          </h6>
        </div>
        <button
          className="btn round-corner btn-success btn-sm mt-2 px-5"
          onClick={() => {
            window.location = window.location.href.includes('localhost')
              ? 'http://localhost:8888/login'
              : 'https://kp-spotlist-backend.herokuapp.com/login';
          }}>
          Sign in with Spotify
        </button>
        <div className="container">
          <p className="p-3">Connect The App to your Spotify account</p>
        </div>
      </div>
    );
  }
}
