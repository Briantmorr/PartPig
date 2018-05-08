import React, {Component} from 'react';
import GenerateRows from './generateMakeRows';
import data from '../../searchpage/dataModel';

class ModelDropdown extends Component {
    constructor(props){
        super(props)
    }

    handleChildClick(event){  
        this.props.modelSelect(event.currentTarget.value);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.selectedMake && nextProps.selectedMake !== this.props.selectedMake){
            this.props.modelSelect('default');
        }
    }

    render(){
        if(this.props.selectedMake === 'default'){
            return(
                <select className="modelDropdown" defaultValue='default' placeholder="Select a Model">
                    <option value='default' disabled="disabled">Select a Model</option>
                </select>
            )
        }else if(this.props.selectedMake !== ''){
            const listOfModels = Object.keys( this.props.data.make[this.props.selectedMake].model );
            const generatedRows = listOfModels.map( (item, index) => <GenerateRows key={index} callback={this.handleChildClick.bind(this)} label={item}/>)

            return(
                <select className="modelDropdown" defaultValue='default' placeholder="Select a Model" value={this.props.value} onChange={(e) => this.handleChildClick(e)}>
                    <option value='default' disabled="disabled">Select a Model</option>
                    {generatedRows}
                </select>
            )
        }
    }
}

export default ModelDropdown;