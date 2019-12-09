import React, { Component } from 'react';

import sptLogo from 'assets/img/spt-logo.png';

class Login extends Component {
  getAuthToken = () => {
    const LOGIN_URI =
      process.env.NODE_ENV !== 'production'
        ? 'http://localhost:8888/login'
        : 'https://kp-spotlist-backend.herokuapp.com/login';

    window.location = LOGIN_URI;
  };

  render() {
    return (
      <div className="text-center app-login row justify-content-center m-0">
        <div className="col-10 align-self-center pb-5">
          <div className="container logo img-fluid pb-3">
            <img src={sptLogo} alt="spotify logo" />
          </div>

          <div className="container mt-4">
            <h4 className="text-white font-weight-bold">
              Spotify Playlists Tracks
            </h4>
          </div>

          <button
            className="btn btn-success round-corner mt-4 mb-5 px-4 px-md-5 py-md-3 font-weight-bold mx-auto"
            onClick={() => this.getAuthToken()}>
            LOGIN TO SPOTIFY
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
