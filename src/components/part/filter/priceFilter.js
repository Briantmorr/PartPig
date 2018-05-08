import React, {Component} from 'react';
import '../../tools/rSlider.css';
import '../../tools/rSlider.js';
import { Redirect } from 'react-router';

class PriceFilter extends Component{

    constructor(props){
        super(props);
       
        this.state = {
            prices: props.filters['prices'],
            redirect: false
        }
        this.newFilters = props.filters;
        this.filterPrices = this.filterPrices.bind(this);
    }
      

    componentDidUpdate(){
        //we only update the slider when the user click in the filters button to expand the filter section
        if(this.props.update){
            //we remove the previous slider to don't have twice the same slider
            var parent = document.getElementById("priceFilterDiv");
            var child = document.getElementsByClassName("rs-container")[0];
            if(parent && child){
                parent.removeChild(child);
            }
            const slider = new rSlider({
                target: '#slider',
                values: this.state.prices[0],
                range: true,
                tooltip: true,
                scale: true,
                labels: false,
                set: this.state.prices[1],
                onChange: this.filterPrices
            });  
        }
    }

    /**
     * method handle onCahnge in the slider
     * @param {*} values 
     */
    filterPrices(values){     
        let sliderElem = document.getElementsByClassName("rs-container")[0]
        //Check if the element is visible
        if(sliderElem && sliderElem.offsetParent !== null){   
            //we change the values of the filter
            let valArray = values.split(',');
            const min = parseInt(valArray[0]);
            const max = parseInt(valArray[1]);
            this.newFilters['prices'][1] = [min,max];
            let index = this.props.match.url.indexOf('/filters');
            let url = index === -1 ? this.props.match.url : this.props.match.url.substring(0,index);
            this.props.history.push(url+'/filters/'+JSON.stringify(this.newFilters));
        }
    }

    render(){            
        
        return (            
            <div id='priceFilterDiv'>                
                <h3>Price</h3>
                <input type="text" id="slider" />                               
            </div>  
        )
    }
}

export default PriceFilter;