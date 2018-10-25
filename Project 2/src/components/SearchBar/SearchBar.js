import React,{Component} from 'react';
import  './SearchBar.css';

class SearchBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            term: ''
        }
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    handleSearch = (event) => {
       
        this.props.searchSpotify(this.state.term);
        event.preventDefault();
        
     
   
    }

    handleTermChange(event) {
        this.setState({term:event.target.value})
        
    }

    render () {
        return (
            <div className = "SearchBar">
                <input id="searchField" type="text"  placeholder ="Search by Artist,Album or tracks" onChange ={this.handleTermChange} />
                <a  onClick = {this.handleSearch}>Search</a>
            </div>
        )
    }

}

export default SearchBar;