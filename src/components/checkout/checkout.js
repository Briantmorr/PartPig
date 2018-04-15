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
            userInfo:{}
        }
    }
    
    componentDidMount(){
        const userId = localStorage.getItem('user');
        if(userId){
            const params = {             
                user_id: parseInt(userId)
            };
            const url = 'http://localhost:8000/teampartpig/src/assets/php/CheckoutEndpoints/shippingInfo.php';        
            axios.get(url,{params}).then(resp=>{
                this.setState({  
                    isLoading: true,
                    userInfo:resp.data.data[0]
                });                                
            }).catch(err => {
                console.log('error is: ', err);
            });
        }else{
            this.setState({  
                isLoading: true
            }); 
        }       
    }

    render(){

        if (!this.state.isLoading) {
            return <Loading />;
        }
        let total = 0;
        let listParts = [];

        const fields = inputs.map(((field, index) => {                    
            return <Field key={index} {...field} value={this.state.userInfo[field.name] || ''}/>
        }).bind(this));

        if(this.props.cartParts.length > 0){
            listParts = this.props.cartParts.map(function(item,index){
                total += item.price_usd;
                return ( 
                    <div key={index} className='checkOutPart'> 
                          <p>{item.part_name}<span>${item.price_usd}</span></p>
                    </div>
                )   
            }); 
        }

        return (
            <div className='container'>
                <div className='formCheckoutContainer'>
                    <span>Checkout</span>
                    <hr/>
                    {fields}
                </div>
                <div className='checkoutTotal'>
                    <div className="cartTitle"><b>CART SUMARY: ({listParts.length} items)</b> </div>
                    <div className="checkoutList">
                        {listParts}
                        <Link className='button-link' to={"/cart"}>EDIT CART</Link>
                    </div>
                    <hr/>
                    <div className="cartData">
                        <p>SUBTOTAL:  <span>${total}</span></p> 
                        <p>SHIPPING:  <span>$0.00</span></p> 
                        <p>TAX: <span>$0.00</span></p>                   
                        <p>TOTAL:  <span>${total}</span></p> 
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Checkout