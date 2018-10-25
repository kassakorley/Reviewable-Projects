import React,{Component} from 'react';
import './PlayList.css'
import Track from '../Track/Track'


class PlayList extends Component {

    constructor(props) {
        super (props);
        this.state = {
            playlistname:'',
            // playlisttracks:[]
            
        }
    }

    // updateItems = (newplaylisttracks) => {
    //      this.setState({playlisttracks : newplaylisttracks})

    // }

    handlePlayListNameChange = (event) => {

        this.state.playlistname = event.target.value;

    }

    handlePlayListSave = (event) => {
            this.props.savetoPlaylist(this.state.playlistname)
            const pl_name = document.getElementById("playlistname");
            pl_name.value='';
            
    }
 

    render() {
         return (
            <div className="Playlist">
                <input id="playlistname" placeholder='Enter PlayList Name'  onChange = {this.handlePlayListNameChange} />
                <div className="TrackList">
                         {
                            this.props.playlistItems.map (track => {
                            return <Track key= {track.id} track = {track} 
                                    deleted = {() => this.props.deletefromPlayList(track)}
                                    playlist/>
                            })
                      
                        }
                 </div>
                <a className="Playlist-save" onClick={this.handlePlayListSave} >SAVE TO SPOTIFY</a>
            </div>   
        )
    }
};

export default PlayList;