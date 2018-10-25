import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist'
import Spotify from '../../util/Spotify'

class App extends React.Component {
  constructor(props) {
    super(props);
    //hardocded search results state and then search results set to an object wtih the JSON response values
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
  }

  //add track from search list, first check to see if the song ID matches a current song ID in the list if so do nothing.
  //If it doesnt match then push that song to the playlist box
  addTrack(track) {
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      let addedTrack = this.state.playlistTracks;
      addedTrack.push(track);
      this.setState({
        playlistTracks: addedTrack
      });
    }
  }

  //removed selected track using filter based off the track id
  removeTrack(track) {
    let removeTrackItem = this.state.playlistTracks.filter(removedTrack => removedTrack.id !== track.id);
    this.setState({
      playlistTracks: removeTrackItem
    });
  }

  //allow someone to update and change the name of the playlist
  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  //use spotify api to save playlist
  savePlayList() {
    // grab all the tracks from playlist and attach them to track URIS avariable
    //set another variable for the current state playlist name
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    let playlistName = this.state.playlistName;
    //passed the two above variables over to the spotify save playlist method and then reset the two states to the defaults below
    Spotify.savePlayList(playlistName, trackURIs).then(reset => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

//set search method
  search(term) {
    //leverage spotify search method, pass term down, then set state with search results from promise
    Spotify.search(term).then(searchResults => {
      this.setState({
        searchResults: searchResults
      });
    })
  }

  //passed the state of the search Results of app to search reults component
 //passed in from the state to the playlist component
 //passed update name method to playlist componenet
 //passed saveplaylist to playlist component
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
           <SearchBar  onSearch={this.search}/>
          <div className="App-playlist">
           <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
           <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlayList}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
