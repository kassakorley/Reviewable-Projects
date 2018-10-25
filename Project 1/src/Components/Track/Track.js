import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  //method to add a track linking off of atrribute props
  addTrack() {
    this.props.onAdd(this.props.track);
  }

  //method to remove a track linking off of atrribute props
  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  //create method to add/remove a track on click
  renderAction() {
    if (this.props.isRemoval) {
      return <span className='Track-action' onClick={this.removeTrack}>-</span>;
    } else {
      return <span className='Track-action' onClick={this.addTrack}>+</span>;
    }
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a className="Track-action">{this.renderAction()}</a>
      </div>
    );
  }
}

export default Track;
