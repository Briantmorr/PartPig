import React from 'react';
import LoginForm from "./loginForm";
import "./login.css";
import './loginMedia.css';
import SignUpButton from './signUp/signUpButton';

const Login = (props) => (
    <div className="login-container">
        <LoginForm {...props} />
       <SignUpButton/>
    </div>
);

export default Login;