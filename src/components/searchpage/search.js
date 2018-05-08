import React, {Component} from 'react';
import MakeDropDown from '../tools/dropdown/makeDropdown';
import ModelDropDown from '../tools/dropdown/modelDropdown';
import YearDropDown from '../tools/dropdown/yearDropdown';
import data from './dataModel';
import './search.css';
import {Link} from 'react-router-dom';

class DropDownContainer extends Component {
    constructor(props){
        super(props)

        this.state = {
            make: 'default',
            model: 'default',
            year: 'default',
            searchText:'',
            showErrorBorder: {}
        }
        this.validateFields = this.validateFields.bind(this);
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
        const caughtYear = selectedYear
        this.setState({
            year: caughtYear
        })
    }

    handleChange(event){
        this.setState({
            searchText: event.target.value
        });
    }

    // handleError(){
    //     this.setState({
    //         showErrorBorder : {
    //             border: 'solid red 2px'
    //         }
    //     })
    // }

    validateFields(){

        if((this.state.make !== 'default' && this.state.model !== 'default' && this.state.year !== 'default') || this.state.searchText !== ''){
            if((this.state.searchText !== '') && (this.state.make !== 'default' && this.state.model === 'default' && this.state.year === 'default')){
                // this.handleError();
                return false
            }else if((this.state.searchText !== '') && (this.state.make !== 'default' && this.state.model !== 'default' && this.state.year === 'default')){
                return false;
            }else{
                return true;
            }
        }
    }

    handleEnterKey(e,queryStr){
        if (e.charCode == 13) {
            this.props.history.push("/partresults" + queryStr);
        }
    }

    render(){

        let queryStr = this.state.make !== 'default' ? '/make/' + this.state.make : '';
        queryStr += this.state.model !== 'default' ? '/model/' + this.state.model : '';
        queryStr += this.state.year !== 'default' ? '/year/' + this.state.year : '';
        queryStr += this.state.searchText !== '' ? '/keyword/' + this.state.searchText : '';

        let searchButton = <Link className='button-link' to={"/partresults" + queryStr}> FIND PARTS </Link>
        if(!this.validateFields()){
            searchButton = <Link  onClick={e => e.preventDefault()} className='disabled' to={"/partresults" + queryStr}> FIND PARTS </Link>
            //after button throw, run the check that is before the handlerError method from above
        }
        
        return(
            <div className="outerDiv">
                <div className="dropdownMenu">
                    <div className="searchBarContainer">
                        <input onKeyPress={(e)=>this.handleEnterKey(e,queryStr)} type="text" value={this.state.searchText} onChange={this.handleChange.bind(this)} placeholder='Search By Part Name'/> 
                    </div>
                    <div className="buttonsContainer">
                        <MakeDropDown data={data} makeSelect={this.catchMakeSelect} currentMake={this.state.make}/>
                        <ModelDropDown data={data} value={this.state.model} modelSelect={this.catchModelSelect} selectedMake={this.state.make} selectedModel={this.state.model}/>
                        <YearDropDown data={data} value={this.state.year} yearSelect={this.catchYearSelect} selectedMake={this.state.make} selectedModel={this.state.model}/>
                        {searchButton}
                    </div>
                    <div className='instruction'>
                        Please enter keywords or select all the three fields to start your search.
                    </div>                    
                </div>
            </div>
        )
    }
}

export default DropDownContainer