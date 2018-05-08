import React, {Component} from 'react';

class Sorter extends Component {
    
    constructor(props){
        super(props);
        this.sortMethods = {
            priceAsc: (a,b)=> a.price_usd - b.price_usd,
            priceDesc: (a,b)=> b.price_usd - a.price_usd
        }
    }

    /**
     * Handle when the user change the select and send back to the partList component the method to order
     * @param {*} event 
     */
    handleChange(event){
        const method = event.target.value;
        this.props.sortPartArray(this.sortMethods[method]);
    }

    render(){        
        return (
            <div className='sorterContainer'>
                <label>Sort by: </label>
                <select onChange={this.handleChange.bind(this)}>
                    <option value='priceAsc'>Price:Low to High</option>
                    <option value='priceDesc'>Price:High to Low</option>
                </select>
            </div>            
        );
    }
}

export default Sorter;