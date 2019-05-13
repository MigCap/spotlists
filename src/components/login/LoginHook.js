import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { getHashParams } from '../../app/helpers';

import Loader from '../Loader/Loader';

import queryString from 'query-string';

const LoginHook = () => {
  const [accessToken, setAccessToken] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [user] = useState('');

  useEffect(() => {
    const parsed = queryString.parse(window.location.search);
    const token = parsed.access_token;

    if (!token) return;

    if (token && token !== '') {
      window.localStorage.setItem('spotify_access_token', token);
      setAccessToken(token);
      setIsAuth(true);
    }
  }, []);

  const getAuthToken = (isAuth, user) => {
    if (user !== '' && isAuth) {
      return (
        <Redirect
          to={{
            pathname: '/dashboard',
            state: {
              accessToken
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

  if (!isAuth && accessToken === '') {
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
            A simple react app which lists your playlist and the total amount of
            hours of them, showing 3 top tracks from each one.
          </h6>
        </div>
        <button
          className="btn btn-success round-corner mt-5 px-5 font-weight-bold"
          onClick={() => getAuthToken(isAuth, user)}>
          LOGIN TO SPOTIFY
        </button>
      </div>
    );
  } else if (isAuth) {
    return (
      <Redirect
        to={{
          pathname: '/dashboard',
          state: {
            accessToken
          }
        }}
      />
    );
  } else if (!isAuth && accessToken === '') {
    return <Loader />;
  }
};

export default LoginHook;
