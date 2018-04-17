import React, {Component} from "react";
import './checkout.css';
import {Link} from 'react-router-dom';
import Field from './field';
import Loading from '../loading/loading';
import axios from 'axios';
import inputs from './fieldsData';

class Checkout extends  Component {

    constructor(props){
        super(props);

        this.state = { 
            isLoading: false,
            billingAddress:{},
            shippingAddress:{},
            sameAddress: false
        }
        this.userId = localStorage.getItem('user');
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    componentDidMount(){
        this.userId = localStorage.getItem('user');
        if(this.userId){
            //Shiping Address
            const params = {             
                user_id: parseInt(this.userId),
                addressType: 'shipping'
            };
            const url = 'http://localhost:8000/teampartpig/src/assets/php/CheckoutEndpoints/getAddressInfo.php';        
            axios.get(url,{params}).then(resp=>{
                this.setState({  
                    shippingAddress:resp.data.data[0]
                }); 
                //billing Address     
                const params = {             
                    user_id: parseInt(this.userId),
                    addressType: 'billing'
                };
                const url = 'http://localhost:8000/teampartpig/src/assets/php/CheckoutEndpoints/getAddressInfo.php';        
                axios.get(url,{params}).then(resp=>{
                    this.setState({  
                        isLoading: true,
                        billingAddress:resp.data.data[0],
                        sameAddress:this.compareTwoAddresses(this.state.shippingAddress,resp.data.data[0])
                    });                                
                }).catch(err => {
                    console.log('error is: ', err);
                });                          
            }).catch(err => {
                console.log('error is: ', err);
            });
        }else{
            //anonymous user
            this.setState({  
                isLoading: true
            }); 
        }   
       
        //Change the status of the parts in the cart to incheckout
        let partsId = [];
        if(this.props.cartParts.length > 0){
            partsId = this.props.cartParts.map(function(item,index){                
                return item.id
            }); 
        }
        const params = {             
            status: 'incheckout',
            id:JSON.stringify(partsId)
        };
        const urlStatus = 'http://localhost:8000/teampartpig/src/assets/php/CheckoutEndpoints/multipleStatusUpdates.php';        
        axios.get(urlStatus,{params}).then(resp=>{
            console.log(resp.data);
        }).catch(err => {
            console.log('error is: ', err);
        });    
    }

    compareTwoAddresses(address1, address2){
        return address1.street_address === address2.street_address && address1.city === address2.city && address1.state === address2.state && address1.zipcode === address2.zipcode
    }

    handleInputChange(event){
        const {value,name} = event.target;
        const newUserInfo = {...this.state.shippingAddress};
        newUserInfo[name] = value;
        this.setState({
            shippingAddress:newUserInfo
        });
        
    }

    backToCart(){
        //Change the status of the parts in the cart to available
        let partsId = [];
        if(this.props.cartParts.length > 0){
            partsId = this.props.cartParts.map(function(item,index){                
                return item.id
            }); 
        }
        const params = {             
            status: 'available',
            id:JSON.stringify(partsId)
        };
        const urlStatus = 'http://localhost:8000/teampartpig/src/assets/php/CheckoutEndpoints/multipleStatusUpdates.php';        
        axios.get(urlStatus,{params}).then(resp=>{
            if(resp.data.success){
                this.props.history.push('/cart');
            }
        }).catch(err => {
            console.log('error is: ', err);
        });    
    }

    handleCheckbox(event){
        this.setState({
            sameAddress:event.target.checked
        });
    }

    completePurchase(){
        if(this.userId){
            let partsId = [];
            if(this.props.cartParts.length > 0){
                partsId = this.props.cartParts.map(function(item,index){                
                    return item.id
                }); 
            }
            const params = {             
                status: 'sold',
                buyer_id: this.userId,
                id:JSON.stringify(partsId)
            };
            const urlStatus = 'http://localhost:8000/teampartpig/src/assets/php/CheckoutEndpoints/multipleStatusUpdates.php';        
            axios.get(urlStatus,{params}).then(resp=>{
                if(resp.data.success){
                    this.props.history.push('/checkoutComplete/'+resp.data.data.order_number);
                }
            }).catch(err => {
                console.log('error is: ', err);
            });   
        } 
    }

    render(){

        if (!this.state.isLoading) {
            return <Loading />;
        }
        let total = 0;
        let listParts = [];

        const shipingFields = inputs.map(((field, index) => {                    
            return <Field key={index} {...field} handleInputChange={this.handleInputChange} value={this.state.shippingAddress[field.name] || ''}/>
        }).bind(this));

        let billingFields = '';
        if(!this.state.sameAddress){
            billingFields = inputs.map(((field, index) => {                    
                return <Field key={index} {...field} handleInputChange={this.handleInputChange} value={this.state.billingAddress[field.name] || ''}/>
            }).bind(this));
        }        

        if(this.props.cartParts.length > 0){
            listParts = this.props.cartParts.map(function(item,index){
                total += item.price_usd;
                return (                     
                    <li key={index} className='checkOutPart'>{item.part_name}<span>${item.price_usd}</span></li>                    
                )   
            }); 
        }

        return (
            <div className='container'>
                <div className='formCheckoutContainer'>
                    <span>Checkout</span>
                    <hr/>
                    <div className='shippingAddress'>                        
                        <span>Shipping Address</span>
                        <hr/>
                        {shipingFields}
                    </div> 
                    <div className='shippingAddress'>                        
                        <span>Billing Address</span>
                        <hr/>
                        <div className='checkbox'>
                            <input type="checkbox" checked={this.state.sameAddress} onChange={this.handleCheckbox.bind(this)} name="sameAddress" />My billing address is the same as my shipping address
                        </div>                        
                        {billingFields}
                    </div>                   
                </div>
                <div className='checkoutTotal'>
                    <div className="cartTitle"><b>CART SUMARY: ({listParts.length} items)</b> </div>
                    <div className="checkoutList">
                        <ul>
                            {listParts}
                        </ul>
                        <button onClick={this.backToCart.bind(this)} className='button-link'>EDIT CART</button>
                    </div>
                    <hr/>
                    <div className="cartData">
                        <p>SUBTOTAL:  <span>${total}</span></p> 
                        <p>SHIPPING:  <span>$0.00</span></p> 
                        <p>TAX: <span>$0.00</span></p>                   
                        <p>TOTAL:  <span>${total}</span></p> 
                    </div>
                    <div>
                        <button onClick={this.completePurchase.bind(this)} className='button-link' to={"/"}>Complete Purchase</button>
                    </div>                   
                </div>
            </div>
        );
    }
}
 
export default Checkout