import React, {Component} from 'react';
import GenerateMakeRows from './generateMakeRows';

class MakeDropDown extends Component {
    constructor(props){
        super(props)
    }

    handleChildClick(event){
        this.props.makeSelect(event.currentTarget.value)
    }

    render(){

        const listOfMakes = Object.keys( this.props.data.make );
        const generatedRows = listOfMakes.map( (item, index) => <GenerateMakeRows key={index} callback={this.handleChildClick.bind(this)} label={item}/>)
        
        return(
            <select className="makeDropdown" defaultValue="default" onChange={(e)=>{this.handleChildClick(e)}}>
                <option value="default" disabled="disabled">Select A Make</option>
                {generatedRows}
            </select>
        )
    }
}

export default MakeDropDown;