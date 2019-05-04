import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    const href = window.location.href;

    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-fixed-top">
          <a className="navbar-brand text-white" href={href}>
            <img className="navbar-logo" src="spt-logo.png" alt="spotify logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link text-success" href={href}>
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-success" href="/login">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
