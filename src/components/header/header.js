import React from "react";
import './header.css';
import Hamburger from '../hamburger/hamburger';
import LoginIcon from '../../assets/icons/loginicon.png';
import {Link} from 'react-router-dom';
import cartIcon from '../../assets/images/cart.png';
import ppLogo from '../../assets/images/partpiglogo.png';
import CartMessage from './../cart/cartMessage';

const Header = (props) => (
 <header>
     <div className="hamburger"><Hamburger/></div>     
     <div className="logo-container"><img className="mainLogo" src={ppLogo}/></div>
     <div className="user-nav">
        <Link to="/login"><img src={LoginIcon} className="login-icon"/></Link>             
        <Link to={"/cart"}><div className="cartDivIcon"><img src={cartIcon} className="cartIcon" /><span className='cartCount'>0</span></div></Link>       
        <Link className="sellPartButton" to="/sellpart"> Sell Part</Link>   
    </div>
    <CartMessage/>
    
 </header>
);

export default Header;

