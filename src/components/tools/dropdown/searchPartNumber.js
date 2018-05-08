import React, {Component} from 'react';

class PartNumberSearch extends Component {
    constructor(props){
        super(props)

        this.state = {
            searchText: '',
            searchResults: ''
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        this.setState({
            searchText: event.target.value
        })
    }

    handleSubmit(event){
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    // getResults(){
    //     //this is a call to the database or partsList to return search results
    // }

    render(){
        return(
            <form className="searchNumber" onSubmit={this.handleSubmit}>
                <label>
                    <input type="text" value={this.state.searchText} onChange={this.handleChange} placeholder='Search By Part Number'/>
                </label>
            </form>
        )
    }
}

export default PartNumberSearch;