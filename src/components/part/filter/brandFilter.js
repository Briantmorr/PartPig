import React, {Component} from 'react';

class BrandFilter extends Component{

    constructor(props){
        super(props);

        this.state = {
            brands: props.brands
        }

        this.checkElement = this.checkElement.bind(this);
    }

    checkElement(event){
        const array = [...this.state.brands];
        for (let i = 0; i < array.length; i++) {
            if (array[i].text === event.target.value) {
                array[i].checked = !array[i].checked;
            }
        }
        let count = 0;
        for (let i = 0; i < array.length; i++) {
            if (!array[i].checked){
                count++;
            }
        }
        this.setState({
            brands: array
        });

        let all = false;
        if(count===array.length){
            all = true;
        }
        this.props.filterMethod(array,all);
    }

    render(){

        const brandList = this.state.brands.map((function(item,index){
            return (
                <div className="filterBrand" key={index}>                    
                    <div><input id={item.text} value={item.text} checked = {item.checked} type="checkbox" onChange={this.checkElement}/></div>
                    <div><label htmlFor={item.text}>{item.text}</label></div>
                </div>  
            )
        }).bind(this));

        return (            
            <div>
                <h2>Brands</h2>
                <hr/>
                {brandList}
            </div>   
        )
    }
}

export default BrandFilter;