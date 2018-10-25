import React,{Component} from 'react'
import './Track.css'



class Track extends Component {

  constructor(props) {
    super(props)
    
  }

  

  handleTrackAddtoPlayList = (event) => {
       this.props.added (this.props.track)
       event.preventDefault();

  }

  handleTrackDeletefromPlayList = (event) => {
    this.props.deleted(this.props.track)
    event.preventDefault();
}

     render() {
        
        let btnsign ='';
         (this.props.playlist)? btnsign='-': btnsign='+'

        // if (this.props.playlist) {
        //           btnsign='-';
        // }
         return (  
              <div className="Track">
                <div className="Track-information">
                  <h3>{this.props.track.name}</h3>
                  <p> {this.props.track.artist} | {this.props.track.album}</p>
                </div>
                <a className="Track-action" onClick = {this.props.playlist? this.handleTrackDeletefromPlayList:this.handleTrackAddtoPlayList}>{btnsign}</a>
              </div>
         )
     }

}

export default Track;