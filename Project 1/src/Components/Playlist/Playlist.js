import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList'

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  //handle click event. takes target value of the input and calls on the onNamechange method from app.js
  handleNameChange(event) {
    //pass target value from input into new vaiable
    let updatedName = event.target.value;
    //call on props of name change and pass it new name
    this.props.onNameChange(updatedName);
  }

  render() {
    //passed in from app.js and the playlist component
    return (
      <div className="Playlist">
        <input value={this.props.playlistName} onChange={this.handleNameChange}/>
         <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
