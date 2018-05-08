import React, {Component} from 'react';
import GenerateRows from './generateMakeRows';
import data from '../../searchpage/dataModel';

class YearDropdown extends Component {
    constructor(props){
        super(props)
    }

    handleChildClick(event){
        this.props.yearSelect(event.currentTarget.value);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.selectedModel && nextProps.selectedModel !== this.props.selectedModel){
            this.props.yearSelect('default');
        }
    }

    render(){
        if(this.props.selectedModel === 'default'){
            return(
                <select readOnly value={this.props.selectedModel} className="yearDropdown" placeholder="Select a Year">
                    <option value="default" disabled="disabled">Select a Year</option>
                </select>
            )
        }else{
            const listOfYears = this.props.data.make[this.props.selectedMake].model[this.props.selectedModel].years
            const yearsString = listOfYears.map(String);
            const generatedRows = yearsString.map( (item, index) => <GenerateRows key={index} callback={() => {this.handleChange(item)}} label={item}/>)

            return(
                <select readOnly placeholder="Select a Year" value={this.props.value} onChange={(e) => {this.handleChildClick(e)}}>
                    <option value="default" disabled="disabled">Select a Year</option>
                    {generatedRows}
                </select>
            )
        }
    }
}

export default YearDropdown;