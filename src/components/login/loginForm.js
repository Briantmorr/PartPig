import React, { Component } from "react";
import axios from 'axios';
import Loading from '../../components/tools/loading/loading';
import './login.css';
import './loginMedia.css';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                user: '',
                password: ''
            },
            loginError: false,
            isLoading: false,
            errorMessage: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        if(this.state.form.user === ''){
            this.setState({
                isLoading: false,
                errorMessage: 'Please Enter Your Username'
            })
            return false
        }

        if (this.state.form.password === ''){
            this.setState({
                isLoading: false,
                errorMessage: 'Please Enter Your Password'
            })
            return false
        }
        
        this.setState({
            isLoading: true
        })

        const user = e.target['user'].value;
        const password = e.target['password'].value;
        const params = {
            user, password
        }
        const url = '/assets/php/login/loginSubmitted.php';
        axios({
            url: url,
            method: 'post',
            data: params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(resp => {
            if (resp.data.success) {
                this.setState({
                    isLoading: false
                })
                this.props.setUserData(resp.data.data);
                this.props.history.push('/dashboard');
            }
            else {
                this.setState({
                    loginError: true,
                    isLoading: false,
                    errorMessage: 'Invalid Username or Password'
                });
            }
        }).catch(err => {
            // console.log('error is: ', err);
            this.props.history.push('/error');                
        });
        this.reset();
    }

    handleUserInputChange(e) {
        const { value } = e.target
        this.setState({
            form: {
                ...this.state.form,
                user: value
            },
            errorMessage: '',
            loginError: false,
            ...this.state.loginError
        });
    }
    handlePasswordInputChange(e) {
        const { value } = e.target
        this.setState({
            form: {
                password: '',
                ...this.state.form,
                password: value
            },
            errorMessage: '',
            loginError: false,
            ...this.state.loginError
        });
    }
    reset(){
        const {user} = this.state.form.user;
        this.setState({
            form:{
                ...this.state.form,
                password:''
            },
            ...this.state.loginError
        })
    }
    
    render() {

        if(this.state.isLoading){
            return(
                <div className="container">
                    <Loading/>
                </div>
            )
        }

        let errorMessage = '';
        if (this.state.loginError) {
            errorMessage = <h2 className="loginFormErrorMessage">Username or Password Incorrect</h2>;
        }
        const {user, password} = this.state.form;
        return (
            <div className="loginForm">

                <h2 className='loginTitle'>Login with Username</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Username</label>
                    <input type="text" id="user" name="user" value={user} placeholder="user" onChange={this.handleUserInputChange.bind(this)}/>
                    <label>Password</label>
                    <input type="password" id="password" name="password" value={password} placeholder="Password" onChange={this.handlePasswordInputChange.bind(this)}/>
                    <input type="submit" value="Login" />
                </form>
                <h2 className="loginFormErrorMessage">{this.state.errorMessage}</h2>
            </div>
        );
    }
}

export default LoginForm;