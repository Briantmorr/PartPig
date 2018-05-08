import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Loading from '../tools/loading/loading';
import axios from 'axios';
import construction from '../../assets/images/webConstruction.jpg';


class WatchList extends Component {
   
    render(){
        return  (
            <div className="userPartsContainer">     
                <div className="userPartsList">
                    <h2>Your Watchlist</h2>
                    <img src={construction} alt=""/>
                </div>
            </div>
        );
    }
}

export default WatchList;