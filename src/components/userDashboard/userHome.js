import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Loading from '../tools/loading/loading';
import axios from 'axios';


class UserHome extends Component {
 
    render(){
        return  (
            <div className="userDashboard">     
                <div className="dashboardTitle">
                    <h2>Welcome to your user dashboard {this.props.userData}</h2>
                </div>
                <Link to={"/dashboard/activeparts"}>
                    <div className="statContainer button-link">
                        Active Listings 
                    </div>
                </Link>
                <Link to={"/dashboard/partdrafts"}>
                    <div className="statContainer button-link">
                        Saved Drafts 
                    </div>
                </Link>
            </div>     
        );
    }
}

export default UserHome;