import React from "react";
import {Link} from 'react-router-dom';

const Hamburger = (props) => {

    function hideMenu(){
        let checkboxElem = document.querySelector('#menuToggle input[type=checkbox]');
        checkboxElem.checked = !checkboxElem.checked;
    }

    let dashBoard = <Link onClick={hideMenu} to="/dashboard"><li>User Dashboard</li></Link>
    let sellPartIcon = <Link onClick={hideMenu} to="/sellpart"><li>Sell a Part</li></Link>  
    if(!props.userId){
        dashBoard = <Link onClick={hideMenu} to="/login"><li>User Dashboard</li></Link>
        sellPartIcon = <Link onClick={hideMenu} to="/login"><li>Sell a Part</li></Link> 
    }

    return(
          <div id="menuToggle">
            <input type="checkbox"/>
            <span></span>
            <span></span>
            <span></span>
            <ul id="menu">
              <Link onClick={hideMenu} to="/"><li>Home</li></Link>
              {dashBoard}
              {sellPartIcon}
              <Link onClick={hideMenu} to="/about"><li>About us</li></Link>
              <Link onClick={hideMenu} to="/contact"><li>Contact</li></Link>
            </ul>
          </div>
    );
}

export default Hamburger;