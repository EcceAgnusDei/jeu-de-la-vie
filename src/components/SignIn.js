import React, { Component } from 'react';
import apiPath from '../apiPath';

class SignIn extends Component {
	constructor() {
		super();
		this.state = {
			login: '',
			password: '',
			confirmPassword: '',
			email: '',
			loginState: false,
			passwordState: false,
			confirmPasswordState: false
		};

		this.logins = [];

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const {name, value} = event.target;
		this.setState({[name]: value});

		if(name === 'login') {
			this.logins.indexOf(value) === -1 ?
			this.setState({loginState: true}) :
			this.setState({loginState: false})
		}
		else if(name === 'password') {
			value.length < 8 ?
			this.setState({passwordState: false}) :
			this.setState({passwordState: true});
		}
		else if(name === 'confirmPassword')
		{
			const state = this.state.password === value ? true : false;
			this.setState({confirmPasswordState: state});
		}
	}

	handleSubmit(event) {
		event.preventDefault();

		if(this.state.loginState && this.state.passwordState && this.state.confirmPasswordState)
		{
			fetch(`${apiPath}signIn.php`, {
				method: 'POST',
				body: JSON.stringify([this.state.login, this.state.password, this.state.email])
			})
				.then(response => response.json())
				.then(json => {
					if(json === true) {
						this.props.log(this.state.login, this.state.password);
						this.props.handleNav('Accueil');
					} else {
						alert('erreur');
					}
				})
		}
	}

	componentDidMount() {
		fetch(`${apiPath}getLogins.php`)
			.then(response => response.json())
			.then(json => {this.logins = json})
	}
	
	render() {
		return (
			<React.Fragment>
				<form className="signin-form" onSubmit={this.handleSubmit}>
					<label>Pseudo
					{!this.state.loginState && this.state.login.length != 0 && <div className="signin-error_message">Pseudo déjà existant</div>}
					<input 
						type="text" 
						name="login"
						onChange={this.handleChange} 
						value={this.state.login}
						title="Entrez votre pseudo."
						required
					/>
					</label>
					<label>Mot de passe
					{!this.state.passwordState && this.state.password.length != 0 && <div className="signin-error_message">Mot de passe trop court (8 caractères minimum)</div>}
					<input 
						type="password" 
						name="password" 
						onChange={this.handleChange} 
						value={this.state.password} 
						title="Entrez votre mot de passe de 8 caractères minimum."
						required
					/>
					</label>
					<label>Confirmez mot de passe
					{!this.state.confirmPasswordState && this.state.confirmPassword.length != 0 && <div className="signin-error_message">Ne correspond pas au mot de passe</div>}
					<input 
						type="password" 
						name="confirmPassword" 
						onChange={this.handleChange} 
						value={this.state.confirmPassword}
						title="Retapez votre mot de passe"
						required
					/>
					</label>
					<label>Mail
					<input 
						type="email" 
						name="email" 
						onChange={this.handleChange} 
						value={this.state.email}
						title="Entre votre mail."
						required 
						/>
					</label>
					<button className="btn">S'inscrire</button>
				</form>
			</React.Fragment>
		);
	}
}

export default SignIn
