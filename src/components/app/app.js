import React, {Component} from 'react';
import './app.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Home from '../home/home';
import PartList from '../part/partList/partList';
import PartDetails from '../part/partDetails/partDetails';
import About from '../about/about';
import Contact from '../contact/contact';
import SellPart from '../sellpart/sellpart';
import Login from '../login/loginForm/loginForm';


class App extends Component{

    constructor(props){
        super(props);

        this.partInfo = {};
        this.filterBrands = [];
    }

    recoverInfo(info,filters){
        this.partInfo = info;
        this.filters = filters;
    }

    render(){
        return (
            <Router>
                <div className='mainContainer'>
                    <Header/>            
                    <Route exact path='/' component={Home}/>
                    <Route path='/partresults' render={() => <PartList info={this.recoverInfo.bind(this)} filters={this.filters}/>} />
                    <Route path='/partdetails' render={() => <PartDetails partInfo={this.partInfo} />}/>
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
