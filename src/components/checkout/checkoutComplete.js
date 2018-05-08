import React from "react";
import {Link} from 'react-router-dom';

const CheckoutComplete = (props) => {
    
    return (
        <div className="container">
            <div className='orderCompleted'>
                <h2>Your purchase is complete</h2>
                <h1>Thank you for your order</h1>
                <h2>Your order number is <span className='orderNumber'> {props.match.params.orderNumber}</span></h2>
                <h2>You are going to receive an email with the details of your order</h2>

                <Link  className='button-link' to={props.urlBack}>Keep Shopping</Link>

            </div>           
        </div>
    );
};

export default CheckoutComplete