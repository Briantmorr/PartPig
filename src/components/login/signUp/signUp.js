import React, {Component} from 'react';
import './signUp.css';
import './signUpMedia.css';
import axios from 'axios';
import Loading from '../../tools/loading/loading';
import {Link} from 'react-router-dom';

class SignUp extends Component {
   constructor(props){
       super(props)
          
       this.state = {
           email: '',
           username: '',
           userExists: false,
           password: '',
           confirmPass: '',
           errorMessage: '',
           isLoading: false
       }

       this.validateEmail = this.validateEmail.bind(this);
       this.validate = this.validate.bind(this);
       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
       
   }

   handleChange(event){
       this.setState({
           errorMessage: '',
           email: event.target.value
       })
   }

   handleUserChange(event){
       this.setState({
           errorMessage: '',
           username: event.target.value
       })
   }

   handlePassChange(event){
       this.setState({
           errorMessage: '',
           password: event.target.value
       })
   }

    handleConfirm(event){
        this.setState({
           errorMessage: '',
           confirmPass: event.target.value
        })
    }

    validateEmail(){
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(this.state.email);
    }

    validate(){
        if (this.validateEmail() === true) {
			return true
		}else if(this.validateEmail() === false){
			this.setState({
                isLoading: false,
				errorMessage: 'Invalid Email Address'
			})
			return false;
		}
	}

   handleSubmit(event){
       event.preventDefault();

       const { username, email, password } = this.state
       const params = {
           username, email, password
       }

        this.setState({
            isLoading: true
        });

        if(this.state.email === ''){
			this.setState({
				isLoading: false,
				errorMessage: 'Please Enter an Email'
			})
			return false
		}else if(this.state.email !== ''){
			if(!this.validate()){
				return false
			}
		}

        if(!this.state.username){
            this.setState({
                isLoading: false,
                errorMessage: 'Please Enter a Username'
            })
            return false
        }

        if((this.state.password.length < 8) && (this.state.confirmPass.length < 8)){
           this.setState({
               isLoading: false,
               errorMessage: 'Password Must be at Least 8 Characters Long'
           })
           return false
        }

        if(this.state.password !== this.state.confirmPass){
           this.setState({
               isLoading: false,
               errorMessage: 'Mismatching Password Fields'
           })
           return false
        }

        if((this.state.password === this.state.confirmPass) && ((this.state.password.length > 7) && (this.state.confirmPass.length > 7))){
           axios({
               url: '/assets/php/login/newUserSignup.php',
               method: 'post',
               data: params,
               headers: {
                   'Content-Type': 'application/x-www-form-urlencoded'
               }
            }).then(resp => {               
               if(resp.data.data[0] === 'invalid email'){
                    this.setState({
                       isLoading: false,
                       errorMessage: 'Invalid Email Address'
                   })
                }else if(resp.data.hasOwnProperty('duplicate')){
                    this.setState({
                        isLoading: false,
                        errorMessage: 'User Already Exists'
                    })
                }
                else if(resp.data.success){
                    let userId = resp.data.data[1];
                    this.setState({
                        isLoading: false
                    })
                    this.props.history.push(`/signUpDetails/${userId}`);
                }
            }).catch(err => {
            //    console.log('error is: ', err);
               this.props.history.push('/error');                

            });
            }
        }
    

   render(){

        if (this.state.isLoading) {
            return(
                <div className='container'>
                    <Loading />
                </div>
            );
        }

        return (
            <div>
                <div className="outer-container">
                    <div className="inner-container">
                        <form onSubmit={this.handleSubmit}>
                            <h2 className="createAccountHeader">Create an Account</h2>
                            <label>Email Address:</label>
                            <input value={this.state.email} onChange={this.handleChange.bind(this)} type="text"/>
                            <label>Desired Username:</label>
                            <input value={this.state.username} onChange={this.handleUserChange.bind(this)} type="text"/>
                            <label>Password:</label>
                            <input value={this.state.password} onChange={this.handlePassChange.bind(this)} type="password"/>
                            <label>Confirm Password:</label>
                            <input value={this.state.confirmPass} onChange={this.handleConfirm.bind(this)} type="password"/>
                            <input className="submitButton button-link" type="submit" value="Sign Up"/>
                            <h2 className="signUpFormErrorMessage">{this.state.errorMessage}</h2>
                        </form>
                    </div>
                    <div className="loginMessage">
                        <h3>Already Have an Account?</h3>
                        <h3>Click <Link to={"/login"}>HERE</Link> to Log In</h3>
                    </div>
                </div>
            </div>
        )
   }
}

export default SignUp;