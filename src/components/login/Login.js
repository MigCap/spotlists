import React, { Component } from 'react';

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
      <div className="text-center p-3 app-login pt-md-5">
        <div className="container logo img-fluid pb-3">
          <img src="spt-logo.png" alt="spotify logo" />
        </div>

        <div className="container pt-4">
          <h4 className="text-white">SPOTIFY PLAYLIST TRACKS</h4>
        </div>

        <div className="container mt-4 px-lg-5">
          <h6 className="text-muted px-lg-5">
            A simple react app which lists your playlist and the total amount of
            hours of them, showing 3 top tracks from each one.
          </h6>
        </div>
        <button
          className="btn btn-success round-corner mt-5 px-5 font-weight-bold"
          onClick={() => this.getAuthToken()}>
          LOGIN TO SPOTIFY
        </button>
      </div>
    );
  }
}

export default Login;
