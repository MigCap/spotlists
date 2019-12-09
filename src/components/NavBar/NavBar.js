import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import {
  IconUser,
  IconGithub,
  IconSpotify,
  IconTime,
  IconMicrophone,
  IconPlaylist,
  IconMusic
} from '../icons';
class NavBar extends Component {
  render() {
    return (
      <nav className="navBar">
        <div className="spotify-nav-icon">
          <a href="/">
            <IconSpotify />
          </a>
        </div>
        <ul className="navegacion">
          <li>
            <NavLink
              className="text-white font-weight-bold"
              exact={true}
              to="/"
              activeClassName="active">
              <IconUser />
              <div className="mt-1">Dashboard</div>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-white font-weight-bold"
              to="/top-artists"
              activeClassName="active">
              <IconMicrophone />
              <div className="mt-1">Top Artists</div>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-white font-weight-bold"
              to="/top-tracks"
              activeClassName="active">
              <IconMusic />
              <div className="mt-1">Top Tracks</div>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-white font-weight-bold"
              to="/recent"
              activeClassName="active">
              <IconTime />
              <div className="mt-1">Recent</div>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-white font-weight-bold"
              to="/playlists"
              activeClassName="active">
              <IconPlaylist />
              <div className="mt-1">Playlists</div>
            </NavLink>
          </li>
        </ul>
        <div className="github-icon">
          <a
            href="https://github.com/MigCap/kp-spotlist"
            target="_blank"
            rel="noopener noreferrer">
            <IconGithub />
          </a>
        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);
