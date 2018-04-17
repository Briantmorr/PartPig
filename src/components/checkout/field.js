import React, {Component} from 'react';
import states,{abbrState} from '../tools/states';

class Field extends Component{

    render(){

        const {width, label, type, placeholder, name, value, disabled, handleInputChange} = this.props;

        const style={width};

        const statesList = states.map((item,index)=>{ 
            return <option key={index} value={item[1]} selected={value === item[1] ? 'selected' : ''}>{item[0]}</option>
        });

        let field = '';
        if(type==='select'){
            field=(<select name={name} onChange={handleInputChange}>
                        {statesList}  
                    </select>
            );
        }else{
            field = <input disabled={disabled} onChange={handleInputChange} value={value} name={name} type={type} placeholder={placeholder}/>;
        }    

        return (            
            <div className='form-group' style={style}>
                <label>{label}</label>
                {field}            
            </div>                                
        )
    }
}


export default Field;