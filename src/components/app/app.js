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
import ContactPage from '../contact/contact';
import ContactSeller from '../contact/seller/contactSeller';
import SellPartForm from '../sellpart/sellPartForm';
import Login from '../login/login';
import Search from '../searchpage/search';
import Cart from '../cart/cart';
import Checkout from '../checkout/checkout';
import ListingSuccess from '../listingSuccess/listingSuccess';
import UserDashboard from '../userDashboard/userDashboard';
import axios from 'axios';
import CheckoutComplete from './../checkout/checkoutComplete';


class App extends Component{

    constructor(props){
        super(props);     
        this.state = {
            cartParts: []
        }   

        this.addPart = this.addPart.bind(this);
        this.removePart = this.removePart.bind(this);
        this.removeListing = this.removeListing.bind(this);
        this.saveFilters = this.saveFilters.bind(this);
        this.saveUrlBack = this.saveUrlBack.bind(this);
        this.setUserData = this.setUserData.bind(this);
        this.removeAllPartsFromCart = this.removeAllPartsFromCart.bind(this);
        this.urlBack = '';
        this.user = null;
        this.userId = localStorage.getItem('user');
        if(this.userId){
            this.getPartsFromCartByUserId(this.userId);
        }
    }

    setUserData(data){
        if(data && data[0]){
            this.user=data[0];
            this.userId = data[0].id;
            localStorage.setItem('user',data[0].id);
            //axios call to get all the parts in the cart for this user
           this.getPartsFromCartByUserId(data[0].id);
        }
    }

    getPartsFromCartByUserId(userId){
        const params = {               
            user_id: parseInt(userId)
        };
        this.removeAllPartsFromCart(this.state.cartParts);
        const url = 'http://localhost:8000/teampartpig/src/assets/php/buyerCart.php';        
        axios.get(url,{params}).then(resp=>{
             resp.data.data.map((item ,index)=>{
                this.addPartToCart(item,true);
             });           
        }).catch(err => {
            console.log('error is: ', err);
        });
    }

    containsObject(obj, list) {        
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === obj.id) {
                return true;
            }
        }    
        return false;
    }

    addPart(partInfo,initLoad){

        if(this.userId){
            
            const params = {
                part_id: parseInt(partInfo.id),
                user_id: parseInt(this.userId)
            };
            const url = 'http://localhost:8000/teampartpig/src/assets/php/addPartToCart.php';        
            axios.get(url,{params}).then(resp=>{
                this.addPartToCart(partInfo,initLoad);
            }).catch(err => {
                console.log('error is: ', err);
            });
        
        }else{
            this.addPartToCart(partInfo);
        }        
    }

    addPartToCart(partInfo,initLoad){
        const partList = [...this.state.cartParts];
        if(!this.containsObject(partInfo,partList)){
            //Show a message to confirm we add the part to the cart
            if(!initLoad){
                const cartMessage = document.getElementsByClassName('cartMessageContainer');
                cartMessage[0].classList.add("show_block");
            }
            partList.push(partInfo) 
            const cartCount = document.getElementsByClassName('cartCount');
            cartCount[0].textContent = partList.length;
            setTimeout(()=>{
                //hide the message that confirm we add a part to the cart
                if(!initLoad){
                    const cartMessage = document.getElementsByClassName('cartMessageContainer');
                    if(cartMessage.length > 0){
                        cartMessage[0].classList.remove("show_block");
                    }
                }
            },3000);
            this.setState({
                cartParts: partList
            });
        }
    }

    removeAllPartsFromCart(partArray){
        partArray.map((item ,index)=>{
            this.removePartFromCart(item);
         });
    }

    removePart(partInfo){

        if(this.userId){
            
            const params = {
                part_id: parseInt(partInfo.id),
                user_id: parseInt(this.userId)
            };
            const url = 'http://localhost:8000/teampartpig/src/assets/php/deletePartFromCart.php';        
            axios.get(url,{params}).then(resp=>{
                this.removePartFromCart(partInfo);
            }).catch(err => {
                console.log('error is: ', err);
            });
        }else{
            this.removePartFromCart(partInfo);
        }
        
    }

    removePartFromCart(partInfo){
        const partList = [...this.state.cartParts];
        for(let i=0;i<partList.length;i++){
            if(partList[i].id === partInfo.id){
                partList.splice(i,1);
            }
        }               
        const cartCount = document.getElementsByClassName('cartCount');
        cartCount[0].textContent = partList.length;
        this.setState({
            cartParts: partList
        });
    }

    removeListing(partInfo){
        console.log("removed part")
    }

    saveFilters(filters){
        this.filters = filters;
    }
    saveUrlBack(urlBack){
        this.urlBack = urlBack;
    }

    render(){
        return (
            <Router>
                <div className='mainContainer'>
                    <Header/>            
                    <Route exact path='/' component={Search}/>
                    <Route exact path='/partresults' render={props => <PartList cartParts={this.state.cartParts} saveUrlBack={this.saveUrlBack}  addCart={this.addPart} {...props}/>} />
                    <Route path='/partresults/filters/:filters' render={props => <PartList cartParts={this.state.cartParts} saveUrlBack={this.saveUrlBack}  addCart={this.addPart} {...props}/>} />
                    <Route path='/partresults/make/:make/model/:model/year/:year' render={props => <PartList cartParts={this.state.cartParts} saveUrlBack={this.saveUrlBack}  addCart={this.addPart} {...props}/>} /> 
                    <Route path='/partresults/make/:make/model/:model/year/:year/filters/:filters' render={props => <PartList cartParts={this.state.cartParts} saveUrlBack={this.saveUrlBack}  addCart={this.addPart} {...props}/>} />                   
                    <Route path='/partdetails/:id/:fromDashboard' render={props => <PartDetails urlBack={this.urlBack} cartParts={this.state.cartParts} addCart={this.addPart} {...props}/>} />                    
                    <Route path='/about' component={About}/>
                    <Route path='/contact' component={ContactPage}/>
                    <Route path='/contactSeller' component={ContactSeller}/>
                    <Route path='/cart' render={props => <Cart cartParts={this.state.cartParts} removePart={this.removePart} urlBack={this.urlBack} {...props}/>}/>
                    <Route path='/checkout' render={props => <Checkout removeAllPartsFromCart={this.removeAllPartsFromCart} cartParts={this.state.cartParts} {...props}/>}/>
                    <Route path='/sellpart' component={SellPartForm}/>
                    <Route path='/login' render={props => <Login setUserData={this.setUserData} {...props}/>}/>
                    <Route path='/listingsuccess' component={ListingSuccess}/>
                    <Route path='/dashboard' component={UserDashboard}/>
                    <Route path='/checkoutComplete/:orderNumber' component={CheckoutComplete}/>
                    {/* <Footer/>   */}
                </div>
            </Router>  
        );
    }  
}

export default App;
