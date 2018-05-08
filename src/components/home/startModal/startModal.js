
import React, { Component } from "react";
import './startModal.css';


class Modal extends Component {
    constructor(props) {
        super(props);
        this.addClickHandlers();
    }
    
    addClickHandlers() {
        window.onclick = () => this.hideModal();
    }
    hideModal() {
        document.getElementsByClassName('fadeOverlay')[0].classList.add('hide');
        window.onclick = () => { };
    }
    render() {
        return (
            <div className='fadeOverlay'>
                <div className="startModal">
                    <div className="modalEscape"></div>
                    <div className="text modalText">
                        <h1 className="modalTitle">Welcome To PartPig Beta!</h1>
                        <hr />
                        <br />
                        <h3>PartPig is still in beta. Currently most of our parts for sale are listed under</h3>
                        <h3>Make: Subaru, Model:Impreza WRX STI, Year: 2007</h3>
                        <br />
                        <h3>Search this category for a more complete experience.</h3>
                       
                        <h3 className="modalProceed">Click anywhere to proceed!</h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
