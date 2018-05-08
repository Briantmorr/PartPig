import React, {Component} from 'react';

class Field extends Component{

    render(){

        const {width, label, type, placeholder, name, value, disabled, handleInputChange, handleOnBlur, error, required, list} = this.props;

        const style={width};

        let field = '';
        if(type==='select'){
            const selectList = list.map((item,index)=>{ 
                return <option key={index} value={item[1]}>{item[0]}</option>
            });
            field=(<select name={name} onChange={handleInputChange} defaultValue={value}>
                        {selectList}  
                    </select>
            );
        }else if(type==='textarea'){
            field = <textarea rows='5' onBlur={handleOnBlur} className="form-control textarea" disabled={disabled} onChange={handleInputChange} value={value} name={name} type={type} placeholder={placeholder} required={required}/>
        }else{
            field = <input onBlur={handleOnBlur} className="form-control" disabled={disabled} onChange={handleInputChange} value={value} name={name} type={type} placeholder={placeholder} required={required}/>;             
        }    

        return (            
            <div className='form-group' style={style}>
                <label>{label}{required ? ' *' : ''}</label>
                {field}   
                <div className="form-control-border"></div> 
                <div className="help-block">{error}</div>                        
            </div>                                
        )
    }
}


export default Field;