import React from 'react';
import './filter.css'
import PriceFilter from './priceFilter';
import BrandFilter from './brandFilter';
import CategoryFilter from './categoryFilter';

const Filter = (props) =>{

    return (
        <div className={props.filterClass}>            
            <BrandFilter {...props} />
            <PriceFilter {...props}/> 
            <CategoryFilter {...props} />              
        </div>
    )
    
}

export default Filter;