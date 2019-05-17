import React, { Component } from 'react';
import {
  getTopArtistsShort,
  getTopArtistsMedium,
  getTopArtistsLong
} from '../../app/spotify';
import { catchErrors } from '../../app/helpers';
class TopArtists extends Component {
  state = {
    topArtists: null,
    activeRange: 'long'
  };

  apiCalls = {
    long: getTopArtistsLong(),
    medium: getTopArtistsMedium(),
    short: getTopArtistsShort()
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { data } = await getTopArtistsLong();
    this.setState({ topArtists: data });
  }

  async changeRange(range) {
    const { data } = await this.apiCalls[range];
    this.setState({ topArtists: data, activeRange: range });
  }

  setActiveRange = range => catchErrors(this.changeRange(range));

  render() {
    return (
      <div>
        <h1 className="text-muted text-center mt-5">TopArtists</h1>
      </div>
    );
  }
}

export default TopArtists;
