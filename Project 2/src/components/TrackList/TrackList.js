import React,{Component} from 'react'
import Track from '../Track/Track'
import './TrackList.css'


class TrackList extends Component {

     render() {
        return (
           
              <div className="SearchResults">
                <h2>Results</h2>
                <div className="TrackList">
                {
                    this.props.tracks.map (track => {
                       return <Track key= {track.id} track = {track} 
                            added = {() => this.props.addtoPlayList(track)}
                            />
                    })
                      
                }
                </div>
               </div> 
            
        ) 
        
     }

}

export default TrackList;