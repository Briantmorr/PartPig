import React from "react";
import Hamburger from './hamburger';
import loginIcon from '../../assets/icons/loginicon.png';
import loginOut from '../../assets/images/logout.png';
import {Link} from 'react-router-dom';
import cartIcon from '../../assets/images/cart.png';
import ppLogo from '../../assets/images/partpiglogo.png';
import CartMessage from './../cart/cartMessage';

const Header = (props) => {

    function logout(){
        localStorage.removeItem("user");
        props.logout();
    }

    let logIcon = <Link to="/" onClick={logout}><img src={loginOut} title='Logout' alt='Logout' className="login-icon"/></Link>
    let sellPartIcon = <Link className="sellPartButton" to="/sellpart"> Sell Part</Link>  
    if(!props.userId){
        logIcon = <Link to="/login"><img src={loginIcon} title='Login' alt='Login' className="login-icon"/></Link>
        sellPartIcon = <Link className="sellPartButton" to="/login"> Sell Part</Link> 
    }
    

    return (
        <header>
            <div className="hamburger"><Hamburger userId={props.userId}/></div>     
            <div className="logo-container">
                <img className="mainLogo" src={ppLogo}/>
            </div>
            <div className="user-nav"> 
                {sellPartIcon}                            
                <div className="cartDivIcon"><Link to={"/cart"}><img src={cartIcon} className="cartIcon" /><span className='cartCount'>0</span></Link></div>                 
                {logIcon}  
            </div>
            <CartMessage/>    
        </header>
    );
}

export default Header;

