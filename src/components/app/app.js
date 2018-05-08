import React, { Component } from 'react';
import './app.css';
import Header from './header';
import Footer from './footer';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import PartList from '../part/partList';
import PartDetails from '../part/partDetails';
import About from './about';
import ContactPage from './contact';
import SellPartForm from '../sellpart/sellPartForm';
import Login from '../login/login';
import SignUp from '../login/signUp/signUp';
import Home from '../home/home';
import Cart from '../cart/cart';
import Checkout from '../checkout/checkout';
import ListingSuccess from '../sellpart/listingSuccess';
import UserDashboard from '../userDashboard/userDashboard';
import axios from 'axios';
import CheckoutComplete from './../checkout/checkoutComplete';
import AxiosError from '../tools/errorHandling/error';
import SignUpDetails from '../login/signUp/signupDetails';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cartParts: [],
            userId: localStorage.getItem('user'),
            userName: ''
        }
        this.images = ['part1.jpg','part2.jpg','part3.jpg','part4.jpg','part5.jpg','part6.jpg','part7.jpg','part8.jpg','part10.jpg','part11.jpg','part12.jpg','part13.jpg','part15.jpg','part17.jpg','part18.jpg', 'part20.jpg','part21.jpg','part22.jpg','part23.jpg','part24.jpg','part25.jpg','part26.jpg','part27.jpg','part28.jpg','part29.jpg','part30.jpg'];


        this.addPart = this.addPart.bind(this);
        this.removePart = this.removePart.bind(this);
        this.saveFilters = this.saveFilters.bind(this);
        this.saveUrlBack = this.saveUrlBack.bind(this);
        this.setUserData = this.setUserData.bind(this);
        this.removeAllPartsFromCart = this.removeAllPartsFromCart.bind(this);
        this.removeAllPartsYouOwnFromCart = this.removeAllPartsYouOwnFromCart.bind(this);
        this.urlBack = '';
        this.user = null;
        if (this.state.userId) {
            this.getPartsFromCartByUserId(this.state.userId);
        }
    }

    setUserData(data) {
        if (data && data[0]) {
            this.user = data[0];
            localStorage.setItem('user', data[0].id);
            this.setState({
                userId: data[0].id,
                userName: data[0].first_name
            });

            //axios call to get all the parts in the cart for this user
            this.getPartsFromCartByUserId(data[0].id);
        }
    }

    getPartsFromCartByUserId(userId) {
        const params = {
            user_id: parseInt(userId)
        };
        this.removeAllPartsYouOwnFromCart(this.state.cartParts);
        const url = '/assets/php/buyerCart.php';
        axios.get(url, { params }).then(resp => {
            if (resp.data.success) {
                resp.data.data.map((item, index) => {
                    this.addPartToCart(item, true);
                });
                this.setState({
                    userName: resp.data.firstname
                });
            }
        }).catch(err => {
            // console.log('error is: ', err);
            this.props.history.push('/error');

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

    addPart(partInfo, initLoad) {

        if (this.state.userId) {

            const params = {
                part_id: parseInt(partInfo.id),
                user_id: parseInt(this.state.userId)
            };
            const url = '/assets/php/addPartToCart.php';
            axios.get(url, { params }).then(resp => {
                this.addPartToCart(partInfo, initLoad);
            }).catch(err => {
                // console.log('error is: ', err);
                this.props.history.push('/error');

            });

        } else {
            this.addPartToCart(partInfo);
        }
    }

    addPartToCart(partInfo, initLoad) {
        const partList = [...this.state.cartParts];
        if (!this.containsObject(partInfo, partList)) {
            //Show a message to confirm we add the part to the cart
            if (!initLoad) {
                const cartMessage = document.getElementsByClassName('cartMessageContainer');
                cartMessage[0].classList.add("show_block");
            }
            partList.push(partInfo)
            const cartCount = document.getElementsByClassName('cartCount');
            cartCount[0].textContent = partList.length;
            setTimeout(() => {
                //hide the message that confirm we add a part to the cart
                if (!initLoad) {
                    const cartMessage = document.getElementsByClassName('cartMessageContainer');
                    if (cartMessage.length > 0) {
                        cartMessage[0].classList.remove("show_block");
                    }
                }
            }, 2000);
            this.setState({
                cartParts: partList
            });
        }
    }

    removeAllPartsFromCart(partArray) {
        partArray.map((item, index) => {
            this.removePartFromCart(item);
        });
    }

    removePart(partInfo) {

        if (this.state.userId) {

            const params = {
                part_id: parseInt(partInfo.id),
                user_id: parseInt(this.state.userId)
            };
            const url = '/assets/php/deletePartFromCart.php';
            axios.get(url, { params }).then(resp => {
                this.removePartFromCart(partInfo);
            }).catch(err => {
                // console.log('error is: ', err);
                this.props.history.push('/error');

            });
        } else {
            this.removePartFromCart(partInfo);
        }

    }

    removePartFromCart(partInfo) {
        const partList = [...this.state.cartParts];
        for (let i = 0; i < partList.length; i++) {
            if (partList[i].id === partInfo.id) {
                partList.splice(i, 1);
            }
        }
        const cartCount = document.getElementsByClassName('cartCount');
        cartCount[0].textContent = partList.length;
        this.setState({
            cartParts: partList
        });
    }

    removeAllPartsYouOwnFromCart(partArray) {
        partArray.map((item, index) => {
            this.removePartYouOwnFromCart(item);
        });
    }

    removePartYouOwnFromCart(partInfo) {
        const partList = [...this.state.cartParts];
        for (let i = 0; i < partList.length; i++) {
            if (partList[i].id === partInfo.id && partInfo.seller_id === this.state.userId) {
                partList.splice(i, 1);
            }
        }
        const cartCount = document.getElementsByClassName('cartCount');
        cartCount[0].textContent = partList.length;
        this.setState({
            cartParts: partList
        });
    }

    saveFilters(filters) {
        this.filters = filters;
    }
    saveUrlBack(urlBack) {
        this.urlBack = urlBack;
    }

    logout() {
        this.setState({
            userId: null
        });
    }

    render() {
     
        return (
            <Router>
                <div className='mainContainer'>
                        <Header userId={this.state.userId} logout={this.logout.bind(this)} />
                        <Route exact path='/' render={props => <Home images={this.images} {...props} />} />
                        <Route exact path='/partresults' render={props => <PartList cartParts={this.state.cartParts} saveUrlBack={this.saveUrlBack} addCart={this.addPart} {...props} />} />
                        <Route path='/partresults/filters/:filters' render={props => <PartList cartParts={this.state.cartParts} saveUrlBack={this.saveUrlBack} addCart={this.addPart} {...props} />} />
                        <Route exact path='/partresults/keyword/:keyword' render={props => <PartList cartParts={this.state.cartParts} saveUrlBack={this.saveUrlBack} addCart={this.addPart} {...props} />} />
                        <Route path='/partresults/keyword/:keyword/filters/:filters' render={props => <PartList cartParts={this.state.cartParts} saveUrlBack={this.saveUrlBack} addCart={this.addPart} {...props} />} />
                        <Route exact path='/partresults/make/:make/model/:model/year/:year' render={props => <PartList cartParts={this.state.cartParts} saveUrlBack={this.saveUrlBack} addCart={this.addPart} {...props} />} />
                        <Route path='/partresults/make/:make/model/:model/year/:year/filters/:filters' render={props => <PartList cartParts={this.state.cartParts} saveUrlBack={this.saveUrlBack} addCart={this.addPart} {...props} />} />
                        <Route exact path='/partresults/make/:make/model/:model/year/:year/keyword/:keyword' render={props => <PartList cartParts={this.state.cartParts} saveUrlBack={this.saveUrlBack} addCart={this.addPart} {...props} />} />
                        <Route path='/partresults/make/:make/model/:model/year/:year/keyword/:keyword/filters/:filters' render={props => <PartList cartParts={this.state.cartParts} saveUrlBack={this.saveUrlBack} addCart={this.addPart} {...props} />} />
                        <Route exact path='/partdetails/:id/:fromDashboard' render={props => <PartDetails urlBack={this.urlBack} cartParts={this.state.cartParts} addCart={this.addPart} {...props} />} />
                        <Route path='/partdetails/:id/newPart/:newPart' render={props => <PartDetails urlBack={this.urlBack} cartParts={this.state.cartParts} addCart={this.addPart} {...props} />} />
                        <Route path='/about' component={About} />
                        <Route path='/contact' component={ContactPage} />
                        <Route path='/cart' render={props => <Cart cartParts={this.state.cartParts} removePart={this.removePart} urlBack={this.urlBack} {...props} />} />
                        <Route path='/checkout' render={props => <Checkout removeAllPartsFromCart={this.removeAllPartsFromCart} cartParts={this.state.cartParts} {...props} />} />
                        <Route path='/sellpart' component={SellPartForm} />
                        <Route path='/login' render={props => <Login setUserData={this.setUserData} {...props} />} />
                        <Route path='/listingsuccess' component={ListingSuccess} />
                        <Route path='/dashboard' render={props => <UserDashboard userData={this.state.userName} {...props} />} />
                        <Route path='/checkoutComplete/:orderNumber' render={props => <CheckoutComplete urlBack={this.urlBack} {...props} />} />
                        <Route path='/error' component={AxiosError} />
                        <Route path='/signup' component={SignUp} />
                        <Route path='/signUpDetails/:userId' component={SignUpDetails} />
                        <Footer />
                    </div>
            </Router>
        );
    }
}

export default App;
