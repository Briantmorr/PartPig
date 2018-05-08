import React, {Component} from 'react';
import './noResults.css';
import {Link} from 'react-router-dom';


class NoResults extends Component {
        
    constructor(props){
        super(props);
        this.state = {
            // partInfo:{},
            // isLoading: false,  
            // seller_id: 2          
        }
    }

        render(){

        return  (
            <div className="noResultsContainer">
            <h1>No results found :(</h1> 
                <h3>We are very sad we couldn't locate the part you are searching for. 
                    <p>The Part Pig community is rapidly growing so please check back soon!</p>
                        </h3> 
                <div className="noResultsMessage"> 
                <h2>You still have options!</h2>               
                </div>
                <div className="noResultsMessage">
                    <Link to={"/"}><div className="searchAgain">Search Again </div></Link>   
                    {/* <p></p>
                    <Link to={"/"}><div className="searchAgain">Have us find your part</div></Link> */}
                    <p></p>
                    <Link to={"/contact"}> <div className="searchAgain">Send us your feedback</div></Link>                     
                </div>
                
            </div>     
        );
                    
    }
}

export default NoResults