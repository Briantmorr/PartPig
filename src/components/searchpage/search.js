import React, {Component} from 'react';
import MakeDropDown from './dropdown/makeDropdown';
import ModelDropDown from './dropdown/modelDropdown';
import YearDropDown from './dropdown/yearDropdown';
import data from './dataModel';
import './search.css';
import {Link} from 'react-router-dom';
import SearchPartName from './dropdown/searchPartName';
import SearchPartNumber from './dropdown/searchPartNumber';
import PartNameSearch from './dropdown/searchPartName';

class DropDownContainer extends Component {
    constructor(props){
        super(props)

        this.state = {
            make: 'default',
            model: 'default',
            year: 'default',
            searchText:''
        }
        this.catchMakeSelect = this.catchMakeSelect.bind(this)
        this.catchModelSelect = this.catchModelSelect.bind(this)
        this.catchYearSelect = this.catchYearSelect.bind(this)
    }

    catchMakeSelect(selectedMake){
        const caughtMake = selectedMake;
        this.setState({
            make: caughtMake,
            model: 'default',
            year: 'default'
        });
    }

    catchModelSelect(selectedModel){
        const caughtModel = selectedModel
        this.setState({
            model: caughtModel
        });
    }

    catchYearSelect(selectedYear){
        console.log(selectedYear);
        const caughtYear = selectedYear
        this.setState({
            year: caughtYear
        })
    }

    handleChange(event){
        this.setState({
            searchText: event.target.value
        })
    }

    render(){

        const make = this.state.make

        const makeStr = this.state.make !== 'default' ? '/make/' + this.state.make : '';
        const modelStr = this.state.model !== 'default' ? '/model/' + this.state.model : '';
        const yearStr = this.state.year !== 'default' ? '/year/' + this.state.year : '';
        
        return(
            <div className="outerDiv">
                <div className="dropdownMenu">
                    <div className="searchBarContainer">
                        <div>
                            <input type="text" value={this.state.searchText} onChange={this.handleChange} placeholder='Search By Part Name'/> 
                            <Link className='button-link' to={"/partresults" + makeStr + modelStr + yearStr}> FIND PARTS </Link>
                        </div>                        
                    </div>
                    <div className="buttonsContainer">
                        <MakeDropDown data={data} makeSelect={this.catchMakeSelect} currentMake={this.state.make}/>
                        <ModelDropDown data={data} value={this.state.model} modelSelect={this.catchModelSelect} selectedMake={this.state.make} selectedModel={this.state.model}/>
                        <YearDropDown data={data} value={this.state.year} yearSelect={this.catchYearSelect} selectedMake={this.state.make} selectedModel={this.state.model}/>
                    </div>                    
                </div>
            </div>
        )
    }
}

export default DropDownContainer