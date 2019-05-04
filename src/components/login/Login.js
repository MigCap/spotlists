import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <div className="text-center p-3 app-login pt-md-5">
        <div className="container logo img-fluid pb-3">
          <img src="spt-logo.png" alt="spotify logo" />
          <hr />
        </div>

        <div className="container pt-4">
          <h4 className="text-success">SPOTIFY PLAYLIST TRACKS</h4>
        </div>

        <div className="container mt-4 px-lg-5">
          <h6 className="text-white px-lg-5">
            A simple react app which lists your playlist and the total amount of
            hours of them, showing 3 top tracks from each one.
          </h6>
        </div>
        <button
          className="btn btn-outline-success round-corner mt-5 px-5 font-weight-bold"
          onClick={() => {
            window.location = window.location.href.includes('localhost')
              ? 'http://localhost:8888/login'
              : 'https://kp-spotlist-backend.herokuapp.com/login';
          }}>
          LOGIN TO SPOTIFY
        </button>
        <div className="container">
          <p className="p-3">Connect The App to your Spotify account</p>
        </div>
      </div>
    );
  }
}
