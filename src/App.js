import React, { Component } from "react";
import "./App.css";
import "./main.css";
import queryString from "query-string";

let defaultTextColor = "success";
let secondaryTextColor = "black";
let defaultStyle = {
color: defaultTextColor
};


/* let FakeServerData = {
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
}
]
}
}; */

class PlaylistCounter extends Component {
render() {
return (
<div className="" style={{ ...defaultStyle, width: "40%", display: "inline-block" }}>
  <h4>{this.props.playlists.length} Playlists</h4>
</div>
);
}
}
class HoursCounter extends Component {
render() {
let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
return songs.concat(eachPlaylist.songs);
}, []);
let totalDuration = allSongs.reduce((sum, eachSong) => {
return sum + eachSong.duration;
}, 0);
return (
<div className="" style={{ ...defaultStyle, width: "40%", display: "inline-block" }}>
  <h4>Total: {Math.round(totalDuration / 60)} hours</h4>
</div>
);
}
}
class Filter extends Component {
render() {
return (
<div className="container m-b-3">
  <img />
  <input className="container form-control form-control-md" type="text" placeholder="Search Playlist or Songs" onKeyUp={event=>
  this.props.onTextChange(event.target.value)}
  />
</div>
);
}
}

class Playlist extends Component {
render() {
let playlist = this.props.playlist;
return (
      <div className="card cardHeigh" style={{
                ...secondaryTextColor,
                width: "40%",
                display: "inline-block",
                margin: "1em",
                marginTop: "2em",
                color: "black",
              }}>
        <img className="card-img-top" src={playlist.imageUrl} style={{ width: "120px", "margin-top": "1em" }} />
        <div className="card-body">
          <h3 className="card-title text-success" style={{ "margin-top": "0.5em" }}>
            {playlist.name}
          </h3>
          <ul className="list-group list-group-flush">
            {playlist.songs.map(song => (
            <li className="list-group-item">{song.name}</li>
            ))}
          </ul>
        </div>
      </div>
);
}
}

class App extends Component {
constructor() {
super();
this.state = {
serverData: {},
filterString: ""
};
}
componentDidMount() {
let parsed = queryString.parse(window.location.search);
let accessToken = parsed.access_token;
if (!accessToken) return;
fetch("https://api.spotify.com/v1/me", {
headers: { Authorization: "Bearer " + accessToken }
})
.then(response => response.json())
.then(data =>
this.setState({
user: {
name: data.display_name
}
})
);

fetch("https://api.spotify.com/v1/me/playlists", {
headers: { Authorization: "Bearer " + accessToken }
})
.then(response => response.json())
.then(playlistData => {
let playlists = playlistData.items;
let trackDataPromises = playlists.map(playlist => {
let responsePromise = fetch(playlist.tracks.href, {
headers: { Authorization: "Bearer " + accessToken }
});
let trackDataPromise = responsePromise.then(response =>
response.json()
);
return trackDataPromise;
});
let allTracksDataPromises = Promise.all(trackDataPromises);
let playlistsPromise = allTracksDataPromises.then(trackDatas => {
trackDatas.forEach((trackData, i) => {
playlists[i].trackDatas = trackData.items
.map(item => item.track)
.map(trackData => ({
name: trackData.name,
duration: trackData.duration_ms / 1000
}));
});
return playlists;
});
return playlistsPromise;
})
.then(playlists =>
this.setState({
playlists: playlists.map(item => {
return {
name: item.name,
imageUrl: item.images.find(image => image.width == 300).url,
songs: item.trackDatas.slice(0, 3)
};
})
})
);
}
render() {
let playlistToRender =
this.state.user && this.state.playlists
? this.state.playlists.filter(playlist => {
let matchesPlaylist = playlist.name
.toLowerCase()
.includes(this.state.filterString.toLowerCase());
let matchesSong = playlist.songs.filter(song =>
song.name
.toLowerCase()
.includes(this.state.filterString.toLowerCase())
);
return matchesPlaylist || matchesSong.length > 0;
})
: [];
return (
<div className="App">
  {this.state.user ? (
  <div>
    <h1 className="text-success" style={{ ...defaultStyle, fontSize: "4em", marginBottom: "1em"  }}>
      {this.state.user.name}
      's Playlists
    </h1>
    <PlaylistCounter playlists={playlistToRender} />
    <HoursCounter playlists={playlistToRender} />
    <br></br><br></br>
    <div className="card-deck">
      <Filter onTextChange={text=> this.setState({ filterString: text })} />
        {playlistToRender.map(playlist => (
        <Playlist playlist={playlist} />
        ))}
    </div>
  </div>
  ) : (
  <div className="container text-center mt-6">
    <div className="container">
      <h3 className="text-success heading3 display-2">SPOTIFY TOP PLAYLIST'S TRACKS</h3>
    </div>
    <div className="container mt-6">
      <h5>A simple react app which lists your plalist and the total amount of hours of them, showing 3 top tracks from each one.</h5>
    </div>
    <button className="btn btn-outline-success btn-block btn-lg mt-6" onClick={()=> {
      window.location = window.location.href.includes("localhost")
      ? "http://localhost:8888/login"
      : "https://kp-spotlist-backend.herokuapp.com/login";
      }}>Sign in with Spotify
    </button>
    <div className="container mt-6">
      <p>Connect The App to your Spotify account</p>
    </div>
  </div>
  )}
</div>
);
}
}

export default App;