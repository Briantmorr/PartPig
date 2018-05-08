import React, { Component } from "react";
import axios from 'axios';


class Contact extends Component {

	constructor(props) {
		super(props);
		this.state = {
			form: {
				name: "",
				email: "",
				subject: "",
				body: ""
			},
			submitted: "",
			anyMessages: false,
			errorMessage: ''
		}

		this.validate = this.validate.bind(this);
		this.validateEmail = this.validateEmail.bind(this);

	}
	
	reset() {
		this.setState({
			form: {
				name: '',
				email: '',
				subject: '',
				body: ''
			},
			submitted:'true'
		});
		this.submitMessageTimer();
	}
	validateEmail(){
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(this.state.form.email);
    }

    validate(){
        if (this.validateEmail() === true) {
			return true
		}else if(this.validateEmail() === false){
			this.setState({
				anyMessages: true,
				errorMessage: 'Invalid Email Address'
			})
			return false;
		}
	}
	
	submitMessageTimer(){
		setTimeout(() => {
			if(this.props.history.location.pathname === "/contact"){
				this.setState({
					...this.state,
					submitted:''
				})
			};
		}, 3000);
	}
		
	handleSubmit(event) {
		event.preventDefault();

		this.setState({
			anyMessages: false
		})

		if(this.state.form.name === ''){
			this.setState({
				anyMessages: true,
				errorMessage: 'Please Enter a Name'
			})
			return false
		}

		if(this.state.form.email === ''){
			this.setState({
				anyMessages: true,
				errorMessage: 'Please Enter an Email'
			})
			return false
		}else if(this.state.form.email !== ''){
			if(!this.validate()){
				return false
			}
		}

		if(this.state.form.body === ''){
			this.setState({
				anyMessages: true,
				errorMessage: 'Please Enter a Message'
			})
			return false
		}

		const url = '/assets/php/Mail/transactionalEmail.php';
		const data = { ...this.state.form };
		this.reset();


		axios({
			url: url,
			method: 'post',
			data: data,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(resp => {
			
		}).catch(err => {
			// console.log("There was an error:", err);
			this.props.history.push('/error');
		});
	}
	handleNameInputChange(e) {
		const { value } = e.target
		this.setState({
			form: {
				...this.state.form,
				name: value
			},
			anyMessages: false,
			...this.state.submitted
		});
	}
	handleEmailInputChange(e) {
		const { value } = e.target
		this.setState({
			form: {
				...this.state.form,
				email: value
			},
			anyMessages: false,
			...this.state.submitted
		});
	}
	handleSubjectInputChange(e) {
		const { value } = e.target
		this.setState({
			form: {
				...this.state.form,
				subject: value
			},
			anyMessages: false,
			...this.state.submitted
		});
	}
	handleMessageInputChange(e) {
		const { value } = e.target
		this.setState({
			form: {
				...this.state.form,
				body: value
			},
			anyMessages: false,
			...this.state.submitted
		});
	}
	

	render() {
		let submitButton = <button className='button-link'>Submit Your Message</button>;
		let result = "";

		if(this.state.anyMessages === true){
			result = <div className="errorMessageContactPage"><h3>{this.state.errorMessage}</h3></div>;
		}

		if(this.state.submitted){
			submitButton = <button type="button" className='button-link'>Submitted</button>;
		}

		if(this.state.submitted){
			result = <div className="submitted"><h3>Your message has been submitted.</h3><h3> Thank you for your feedback</h3></div>;
		}
		const { name, email, subject, body } = this.state.form;

		return (
			<div className="contact-us">
				<h1>CONTACT US</h1>
				<div className='container contactPageContainer'>
					<div className="contact-header">
						<h3>Have a question? Drop us a line!</h3>
						<h3>Please submit your inquiry through the contact form.</h3>
						<h3>We are committed to providing you the best part-purchasing experience!</h3>
					</div>
					<form className="contactForm" onSubmit={e => this.handleSubmit(e)}>
						<div className="input-container">
							<label htmlFor='name'>Name:</label>
							<input type="text" className="name" value={name} placeholder="First Name, Last Name" onChange={this.handleNameInputChange.bind(this)}/>
						</div>
						<div className="input-container">
							<label>Email:</label>
							<input type="text" className="email" value={email} placeholder="Enter your email address here" onChange={this.handleEmailInputChange.bind(this)}/>
						</div>
						<div className="input-container">
							<label>Subject:</label>
							<input type="text" className="subject" value={subject} placeholder="Enter a subject" onChange={this.handleSubjectInputChange.bind(this)}/>
						</div>
						<div className="input-container">
							<label>Message:</label>
							<textarea className="message" value={body} placeholder="Enter your message here" onChange={this.handleMessageInputChange.bind(this)}></textarea>
						</div>
						{submitButton}
						{result}

					</form>
				</div>
			</div>
		)
	}
}

export default Contact

