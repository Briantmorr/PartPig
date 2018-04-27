import React, {Component} from 'react';
import './signUp.css';
import axios from 'axios';

class SignUp extends Component {
   constructor(props){
       super(props)
          
       this.state = {
           email: '',
           emailError: false,
           username: '',
           userExists: false,
           password: '',
           confirmPass: '',
           errorMessage: ''
       }

       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(event){
       this.setState({
           email: event.target.value
       })
   }

   handleUserChange(event){
       this.setState({
           username: event.target.value
       })
   }

   handlePassChange(event){
       this.setState({
           password: event.target.value
       })
   }

   handleConfirm(event){
       this.setState({
           confirmPass: event.target.value
       })
   }

   handleSubmit(event){
       event.preventDefault();
      
       const { username, email, password } = this.state
       const params = {
           username, email, password
       }

       if(this.state.password !== this.state.confirmPass){
           this.setState({
               errorMessage: 'Mismatching Password Fields'
           })
       }else if(this.state.password === this.state.confirmPass){
           axios({
               url: 'http://localhost:8000/teampartpig/src/assets/php/login/newUserSignup.php',
               method: 'post',
               data: params,
               headers: {
                   'Content-Type': 'application/x-www-form-urlencoded'
               }
           }).then(resp => {
               console.log('response is: ', resp);
               if(resp.data === 'invalid email'){
                    this.setState({
                       errorMessage: 'Invalid Email'
                   })
                }else if(resp.data.hasOwnProperty('duplicate')){
                    this.setState({
                        errorMessage: 'User Already Exists'
                    })
                }
                else if(resp.data.success){
                    this.props.history.push('/signUpDetails');
                }
           }).catch(err => {
               console.log('error is: ', err);
           });
       }
   }

   render(){

        return (
            <div>
                <div className="outer-container">
                    <div className="inner-container">
                        <form onSubmit={this.handleSubmit}>
                            <h2>Create an Account</h2>
                            <label>Email Address:</label>
                            <input value={this.state.email} onChange={this.handleChange.bind(this)} type="email" required/>
                            <label>Desired Username:</label>
                            <input value={this.state.username} onChange={this.handleUserChange.bind(this)} type="text" required/>
                            <label>Password:</label>
                            <input value={this.state.password} onChange={this.handlePassChange.bind(this)} type="password" required/>
                            <label>Confirm Password:</label>
                            <input value={this.state.confirmPass} onChange={this.handleConfirm.bind(this)} type="password" required/>
                            <input className="submitButton" type="submit" value="Sign Up"/>
                            <h2 className="loginFormErrorMessage">{this.state.errorMessage}</h2>
                        </form>
                    </div>
                </div>
            </div>
        )
   }
}

export default SignUp;