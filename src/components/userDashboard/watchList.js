import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Loading from '../tools/loading/loading';
import axios from 'axios';
import construction from '../../assets/images/webConstruction.jpg';


class WatchList extends Component {
        
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

                <div className="userPartsContainer">     
                    <div className="userPartsList">
                        <h2>Your Watch List</h2>
                        <img src={construction} alt=""/>
                    </div>
                </div>
            );
                    
    }
}

export default WatchList