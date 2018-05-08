import React, {Component} from 'react';
import './userDashboard.css';
import './media.css';
import './media2.css';
import Loading from '../tools/loading/loading';
import axios from 'axios';
import UserParts from './userParts/userParts';
import UserHistory from './userHistory';
import UserSettings from './userSettings';
import UserDrafts from './userDrafts';
import UserHome from './userHome';
import WatchList from './watchList';
import {
    BrowserRouter as Router,    
    Route,
    Link,    
    NavLink
} from 'react-router-dom';    


class UserDashboard extends Component {    
        
    constructor(props){
        super(props);
        const userId = localStorage.getItem('user');
        if(!userId){
            props.history.push('/login');
        }
        this.state = {
            isLoading: false,  
            seller_id: userId,
            activeTab: "userParts"          
        }
    }
  
    render(){
        return (            
            <div className="userDashboard">
                <div className="dashboardHeader"><h1>User Dashboard</h1></div>  
                <div className="dashboardTabs">
                    <NavLink activeClassName='active selected' className="tabLinks" to="/dashboard/activeparts">Active</NavLink>
                    <NavLink activeClassName='active selected' className="tabLinks" to="/dashboard/partdrafts" >Drafts</NavLink>
                    <NavLink activeClassName='active selected' className="tabLinks" to="/dashboard/watchlist" >Watchlist</NavLink>
                    <NavLink activeClassName='active selected' className="tabLinks" to="/dashboard/searchhistory" >History</NavLink>
                    <NavLink activeClassName='active selected' className="tabLinks" to="/dashboard/accountsettings" >Settings</NavLink>  
                </div>                   
               
                <div className="tabContent">
                    <Route exact path='/dashboard' render={props => <UserHome {...props} userData={this.props.userData}/>}/>
                    <Route path='/dashboard/activeparts' render={props => <UserParts {...props} userId={this.state.seller_id} />}/>
                    <Route path='/dashboard/partdrafts' render={props => <UserDrafts {...props} userId={this.state.seller_id} />}/>
                    <Route path='/dashboard/searchhistory' component={UserHistory}/>
                    <Route path='/dashboard/watchlist' component={WatchList}/>
                    <Route path='/dashboard/accountsettings' component={UserSettings}/>
                </div>
            </div> 
        )    
    }
}
    
export default UserDashboard