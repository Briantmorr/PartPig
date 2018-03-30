import React from "react";
import "./loginForm.css";

const LoginForm = () => (
    <div className="loginForm">
        <h2>Login with email address</h2>
            <form>
                <label for="email">Email address</label>
                <input type="text" id="email" name="email" placeholder="Email address"></input>
                <label for="password">Password</label>
                <input type="text" id="password" name="password" placeholder="Password"></input>
                <input type="submit" value="Login">
                </input>
            </form>
    </div>
);

export default LoginForm;