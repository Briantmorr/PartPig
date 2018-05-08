import React, {Component} from 'react';

class PartNameSearch extends Component {
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

    render(){
        return(
            <form className="searchName" onSubmit={this.handleSubmit}>               
                <input type="text" value={this.state.searchText} onChange={this.handleChange} placeholder='Search By Part Name'/>                
            </form>
        )
    }
}

export default PartNameSearch;