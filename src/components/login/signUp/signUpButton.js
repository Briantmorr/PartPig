import React from "react";
import "./signUp.css";
import { Link } from 'react-router-dom';

const SignUpButton = () => (
    <div className="signUp_Container">
        <div className="signUp_Message">
            <h2 >No account? No problem! </h2>
            <h2>Sign up for a Partpig account! </h2>
        </div>
        <Link className="signUp_Button button-link" to={"/signup"}> Sign up now!</Link>
    </div>
);

export default SignUpButton;