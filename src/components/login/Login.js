import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import queryString from 'query-string';

import Loader from '../Loader/Loader';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      isAuth: false,
      accessToken: '',
      fetchingUser: true
    };
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    if (!accessToken) return;

    if (accessToken) {
      this.setState({
        isAuth: true,
        accessToken
      });
    }
  }

  getAuthToken = () => {
    const { isAuth, user } = this.state;

    if (user && isAuth) {
      return (
        <Redirect
          to={{
            pathname: '/dashboard',
            state: {
              accessToken: this.state.accessToken
            }
          }}
        />
      );
    }

    if (!isAuth) {
      window.location = window.location.href.includes('localhost')
        ? 'http://localhost:8888/login'
        : 'https://kp-spotlist-backend.herokuapp.com/login';
    }
  };

  render() {
    const { isAuth, accessToken, fetchingUser, user } = this.state;

    if (!isAuth && !accessToken) {
      return (
        <div className="text-center p-3 app-login pt-md-5">
          <div className="container logo img-fluid pb-3">
            <img src="spt-logo.png" alt="spotify logo" />
            <hr />
          </div>

          <div className="container pt-4">
            <h4 className="text-white">SPOTIFY PLAYLIST TRACKS</h4>
          </div>

          <div className="container mt-4 px-lg-5">
            <h6 className="text-muted px-lg-5">
              A simple react app which lists your playlist and the total amount
              of hours of them, showing 3 top tracks from each one.
            </h6>
          </div>
          <button
            className="btn btn-success round-corner mt-5 px-5 font-weight-bold"
            onClick={() => this.getAuthToken()}>
            LOGIN TO SPOTIFY
          </button>
        </div>
      );
    } else if (!isAuth && fetchingUser) {
      return <Loader />;
    } else if (isAuth && user) {
      return (
        <Redirect
          to={{
            pathname: '/dashboard',
            state: {
              accessToken: this.state.accessToken
            }
          }}
        />
      );
    }
  }
}

export default Login;
