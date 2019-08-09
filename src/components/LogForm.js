import React, { Component } from 'react';

class LogForm extends Component {
	constructor() {
		super();
		this.state = {
			login: '',
			password:''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event)
	{
		const {name, value} = event.target;
		this.setState({[name]: value});
	}

	handleSubmit(event)
	{
		const {login, password} = event.target
		event.preventDefault();
		this.props.log(login.value, password.value);
	}
	
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>Login
					<input type="text" name="login" value={this.state.login} onChange={this.handleChange} required/>
				</label>
				<label>Mot de passe
					<input type="password" name="password" value={this.state.password} onChange={this.handleChange} required/>
				</label>
				<button>Go</button>
			</form>
		);
	}
}

export default LogForm
