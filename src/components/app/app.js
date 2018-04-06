import React, {Component} from 'react';
import './app.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import PartList from '../part/partList/partList';
import PartDetails from '../part/partDetails/partDetails';
import About from '../about/about';
import Contact from '../contact/contact';
import SellPart from '../sellpart/sellpart';
import Login from '../login/login';
import Search from '../searchpage/search';


class App extends Component{

    constructor(props){
        super(props);        
    }

    render(){
        return (
            <Router>
                <div className='mainContainer'>
                    <Header/>            
                    <Route exact path='/' component={Search}/>
                    <Route exact path='/partresults' component={PartList} />
                    <Route path='/partresults/:filters' component={PartList} />
                    <Route path='/partdetails/:id/:filters' component={PartDetails}/>
                    <Route path='/about' component={About}/>
                    <Route path='/contact' component={Contact}/>
                    <Route path='/sellpart' component={SellPart}/>
                    <Route path='/login' component={Login}/>
                    <Footer/>  
                </div>
            </Router>  
        );
    }  
}

export default App;
