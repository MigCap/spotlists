import React, { Component } from 'react';
import './App.css';

let defaultTextColor = '#fff';
let defaultStyle = {
  color: defaultTextColor
};
let FakeServerData = {
  user: {
    name: 'David',
    playlists: [
      {
        name: 'My favourites',
        songs:[
          {name: 'Bla Bla', duration: 1345}, 
          {name: 'The The', duration: 1432}, 
          {name: 'Yeah man', duration: 1443}
        ]
      },
      {
        name: 'Discover Weekly',
        songs:[
          {name: 'Bla Bla', duration: 1345}, 
          {name: 'The The', duration: 1432}, 
          {name: 'Dad Dad', duration: 1443}
        ]
      },
      {
        name: 'FUNK',
        songs:[
          {name: 'Beat Funk', duration: 1345}, 
          {name: 'Canelloni Funk', duration: 1432}, 
          {name: 'This is the Funk', duration: 4443}
        ]
      },
      {
        name: 'JAMAICA',
        songs:[
          {name: 'Beat Funk', duration: 1345}, 
          {name: 'Canelloni Funk', duration: 1432}, 
          {name: 'This is the Funk', duration: 4443}
        ]
      }
    ]
  }
};

class PlaylistCounter extends Component {
  render () {
    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}
class HoursCounter extends Component {
  render () {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{Math.round(totalDuration/60)} hours</h2>
      </div>
    );
  }
}
class Filter extends Component {
  render () {
    return (
      <div>
        <img />
        <input type="text" onKeyUp={event => 
          this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
}

class Playlist extends Component {
  render () {
    let playlist = this.props.playlist
    return (
      <div style={{...defaultStyle, width: '25%', display: 'inline-block'}}>
        <img />
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song => 
            <li>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ''
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: FakeServerData});
    }, 1000);
  }
  render() {
    let playlistToRender = this.state.serverData.user ? this.state.serverData.user.playlists
      .filter(playlist =>
        playlist.name.toLowerCase().includes(
          this.state.filterString.toLowerCase())
    ) : []
    return (
      <div className="App">
        {this.state.serverData.user ? 
          <div>
            <h1 style={{...defaultStyle, 'fontSize': '3em'}}>
              {this.state.serverData.user.name}'s Playlist
            </h1>
            <PlaylistCounter playlists={playlistToRender} />
            <HoursCounter playlists={playlistToRender} />
            <Filter onTextChange={text => this.setState({filterString: text})}/>
            {playlistToRender.map(playlist =>
              <Playlist playlist={playlist} />
            )}
          </div> : <h1 style={defaultStyle}>Loading...</h1> 
        }
      </div>
    );
  }
}

export default App;
