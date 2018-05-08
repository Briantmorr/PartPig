import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './error.css';
import '../../userDashboard/media4.css';

class AxiosError extends Component {
    constructor(props) {
        super(props);

        this.onButtonClick = this.onButtonClick.bind(this);
    }
    render() {
        return (

            <div className="errorContainer">
                <div className="errorMessageContainer">
                    <div className="errorTitle">
                        <p id="errorHeader">Server Error</p>
                    </div>
                    <h1>Sorry! There was an error in retrieving your data.</h1>
                    <p>Partpig is still in beta.</p>
                    <p>Please leave us feedback about the problem you encountered and we will fix it as soon as possible!
                        </p>
                    <p>Thank you for your patience.</p>
                    <p> Sincerely,
                   the Part Pig team</p>
                    <button className="button-link feedbackBtn errorButtonSpacing" onClick={this.onButtonClick}>Contact Us</button>
                    <button className="button-link feedbackBtn errorButtonSpacing" onClick={this.props.history.goBack}>Go Back</button>
                </div>
            </div>
        );

    }
    onButtonClick() {
        this.props.history.push('/contact');
    }
}

export default AxiosError;