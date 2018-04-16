import React, { Component } from 'react';
import './partList.css';
import {Link} from 'react-router-dom';
import Filter from '../filter/filter';
import BrandFilter from './../filter/brandFilter';
import axios from 'axios';
import Loading from '../../loading/loading';
import Pagination from './../pagination/pagination';

class PartList extends Component{

    constructor(props){
        super(props);
        this.state = {
            arrayParts:[],
            isLoading: false,
            showFilters: false            
        }
        this.filterBrandMethod = this.filterBrandMethod.bind(this);
        this.filterPriceMethod = this.filterPriceMethod.bind(this);
        this.handleShowFilters = this.handleShowFilters.bind(this);
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
            pricesArray.indexOf(parseInt(parts[i].price_usd))===-1 ? pricesArray.push(parseInt(parts[i].price_usd)) : '';            
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
            const {make,model,year} = this.props.match.params;
            const params = {make,model,year};
            const url = 'http://localhost:8000/teampartpig/src/assets/php/searchSubmit.php';        
            axios.get(url,{params}).then(resp=>{
                    try {
                        this.filters = (this.props.match.params.filters === undefined || this.props.match.params.filters.length === 0) ? this.initFilters(resp.data.data) : JSON.parse(this.props.match.params.filters);
                    } catch (error) {
                        console.log('error is: ', error);
                    }
                    this.filters = (this.props.match.params.filters === undefined || this.props.match.params.filters.length === 0) ? this.initFilters(resp.data.data) : JSON.parse(this.props.match.params.filters);
                   
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
                    this.props.saveUrlBack(this.props.match.url+'/filters/'+JSON.stringify(this.filters));
                    const url = this.props.match.url[this.props.match.url.length] === '/' ? this.props.match.url : this.props.match.url + '/';
                    this.props.history.push(this.props.match.url+'/filters/'+JSON.stringify(this.filters));
                }).catch(err => {
                    console.log('error is: ', err);
                }
            ); 
        }
    }

    componentWillUpdate(){        
        this.props.saveUrlBack(this.props.match.url);
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
            if (parseInt(filteredParts[i].price_usd) >= min && parseInt(filteredParts[i].price_usd) <= max) {               
                filteredParts[i].display.price_usd = true;
            }else{
                filteredParts[i].display.price_usd = false;
            }
        }        
        this.setState({
            arrayParts:filteredParts
        });
    }

    handleShowFilters(){

        let showFilters = !this.state.showFilters;
        this.setState({
            showFilters: showFilters
        });
    }

    render(){
       
        if (!this.state.isLoading) {
            return <Loading />;
        }
        let visibleParts = this.state.arrayParts.filter((part) => {return part.display.brand && part.display.price_usd;});
              
        return (               
            <div className='partResults container'>
                <Link className='button-link' to="/"> Go Back </Link>               
                <Filter update={this.state.showFilters} filterClass={this.state.showFilters ? 'filter' : 'filter hidden'} history={this.props.history} filters={this.filters}/>
                <div className={this.state.showFilters ? 'partList partListFilter' : 'partList'}> 
                    <div className='resultsBar'>
                        <button className='button-link' onClick={this.handleShowFilters}>Filters</button>
                        {visibleParts.length + ' Results'}
                    </div>                   
                    <Pagination {...this.props} allParts={visibleParts} showFilters={this.state.showFilters} />
                </div>
            </div>
        );

    }

}

export default PartList;