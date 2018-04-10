import React, { Component } from 'react';
import Part from '../part';
import './partList.css';
import {Link} from 'react-router-dom';
import Filter from '../filter/filter';
import BrandFilter from './../filter/brandFilter';
import axios from 'axios';
import Loading from '../../loading/loading';

class PartList extends Component{

    constructor(props){
        super(props);
        this.state = {
            arrayParts:[],
            isLoading: false            
        }
        this.filterBrandMethod = this.filterBrandMethod.bind(this);
        this.filterPriceMethod = this.filterPriceMethod.bind(this);
    }

    initFilters(parts){
        let filters = {};
        let pricesArray = [];
        let pricesfilter = [];
        let brandsArray = [];
        for (let i = 0; i < parts.length; i++) {        
            const brand = {
                text: parts[i].brand,
                checked: false
            };
            !this.containsObject(brand,brandsArray) ? brandsArray.push(brand):'';
            pricesArray.indexOf(parseInt(parts[i].price))===-1 ? pricesArray.push(parseInt(parts[i].price)) : '';            
        };
        const brandFilter = [brandsArray,true];
        pricesArray.sort((a,b)=>a-b);
        let pricesValues = [];
        pricesValues.push(pricesArray[0]);        
        pricesValues.push(pricesArray[pricesArray.length-1]);
        pricesfilter.push(pricesArray);
        pricesfilter.push(pricesValues);  
        filters['prices'] = pricesfilter;
        filters['brands'] = brandFilter;
        return filters;
    }

    componentDidMount(){
        
        if (!this.state.isLoading) {
            setTimeout(()=>{
                //hide the message that confirm we add a part to the cart
                const cartMessage = document.getElementsByClassName('cartMessageContainer');
                cartMessage[0].classList.remove("show_block");
            },8000);
            const {make,model,year} = this.props.match.params;
            const params = {make,model,year};
            const url = 'http://localhost:8000/teampartpig/src/assets/php/searchSubmit.php';        
            axios.get(url,{params}).then(resp=>{
                    try {
                        this.filters = (this.props.match.params.filters === undefined || this.props.match.params.filters.length === 0) ? this.initFilters(resp.data.data) : JSON.parse(this.props.match.params.filters);
                    } catch (error) {
                        console.log('error is: ', err);
                    }
                    this.filters = (this.props.match.params.filters === undefined || this.props.match.params.filters.length === 0) ? this.initFilters(resp.data.data) : JSON.parse(this.props.match.params.filters);
                    this.props.saveFilters(this.filters);
                    this.setState({
                        arrayParts:resp.data.data,
                        isLoading: true            
                    });               
                    
                    this.filterPriceMethod(this.filters['prices'][1]);
                    this.filterBrandMethod(this.filters['brands'][0],this.filters['brands'][1]);  
                    
                    const filter = document.getElementsByClassName('filter');
                    filter[0].classList.add("hidden");
                    //call the component again with filters that way in the future when we change the filters
                    //it's going to update no mount
                    this.props.history.push('/partresults/'+JSON.stringify(this.filters));
                }).catch(err => {
                    console.log('error is: ', err);
                }
            ); 
        }
    }

    componentWillUpdate(){
        if(this.props.history.location.pathname !== this.props.location.pathname){
            this.filterPriceMethod(this.filters['prices'][1]);
            this.filterBrandMethod(this.filters['brands'][0],this.filters['brands'][1]);
        }
    }

    containsObject(obj, list) {        
        for (let i = 0; i < list.length; i++) {
            if (list[i].text === obj.text) {
                return true;
            }
        }    
        return false;
    }

    filterBrandMethod(arrayBrands,all){
        const filteredParts = [...this.state.arrayParts];
        for (let i = 0; i < filteredParts.length; i++) {
            for(let j = 0; j < arrayBrands.length; j++){
                if (filteredParts[i].brand === arrayBrands[j].text) {
                    if(all || arrayBrands[j].checked){
                        filteredParts[i].display.brand = true;
                    }else{
                        filteredParts[i].display.brand = false;
                    }
                }
            }
        }        
        this.setState({
            arrayParts:filteredParts
        });
    }

    filterPriceMethod(values){
        
        const min = values[0];
        const max = values[1];
        const filteredParts = [...this.state.arrayParts];
        for (let i = 0; i < filteredParts.length; i++) {            
            if (parseInt(filteredParts[i].price) >= min && parseInt(filteredParts[i].price) <= max) {               
                filteredParts[i].display.price = true;
            }else{
                filteredParts[i].display.price = false;
            }
        }        
        this.setState({
            arrayParts:filteredParts
        });
    }

    showFilters(){
        const partList = document.getElementsByClassName('partList');
        partList[0].classList.toggle("partListFilter");

        const filter = document.getElementsByClassName('filter');
        filter[0].classList.toggle("hidden");
    }

    render(){
       
        if (!this.state.isLoading) {
            return <Loading />;
        }
        let visibleParts = this.state.arrayParts.filter((part) => {return part.display.brand && part.display.price;});
        let list = visibleParts.map((function(item,index){
            return ( 
                <div key={index} className='singlePart'>
                    <Link to={"/partdetails/" + item.id + '/' + JSON.stringify(this.filters)}>
                        <Part history={this.props.history} imageClass='imageContainer' infoClass='productContainer' partInfo={item}/>
                    </Link>                    
                </div>
            )           
        }).bind(this));
       
        return (               
            <div className='partResults container'>
                <Link to="/"> Go Back </Link>               
                <Filter history={this.props.history} filters={this.filters}/>
                <div className='partList'> 
                    <div className='resultsBar'>
                        <button className='button-link' onClick={this.showFilters}>Filters</button>
                        {list.length + ' Results'}
                    </div>                   
                    {list}
                </div>
            </div>
        );

    }

}

export default PartList;