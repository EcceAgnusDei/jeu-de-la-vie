import React, { Component } from 'react';
import apiPath from '../apiPath';

class SignIn extends Component {
	constructor() {
		super();
		this.state = {
			login: '',
			password: '',
			email: '',
			loginColor: 'white',
			passwordColor: 'white'
		};

		this.logins = [];

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const {name, value} = event.target;
		this.setState({[name]: value});

		if(name === 'login') {
			this.logins.indexOf(value) === -1 && value.length !== 0 ? //le pseudo existant ?
			this.setState({loginColor: 'green'}) :
			value.length === 0 ?
			this.setState({loginColor:'white'}) :
			this.setState({loginColor:'red'});
		}
		else if(name === 'password') {
			value.length < 8 ?
			this.setState({passwordColor: 'red'}) :
			this.setState({passwordColor: 'green'});
		}
	}

	handleSubmit(event) {
		event.preventDefault();

		if(this.state.loginColor === 'green' && this.state.passwordColor === 'green')
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
				});
		}
	}

	componentDidMount() {
		fetch(`${apiPath}getLogins.php`)
			.then(response => response.json())
			.then(json => {this.logins = json});
	}
	
	render() {
		return (
			<React.Fragment>
				<form onSubmit={this.handleSubmit}>
					{this.state.loginColor === 'red' && <div>Pseudo déjà existant</div>}
					<label>Pseudo
					<input 
						type="text" 
						name="login"
						onChange={this.handleChange} 
						value={this.state.login} 
						style={{backgroundColor: this.state.loginColor}}
						title="Entrez votre pseudo."
						required
					/>
					</label>
					<label>Mot de passe
					{this.state.passwordColor === 'red' && <div>Mot de passe trop court (8 caractères minimum)</div>}
					<input 
						type="password" 
						name="password" 
						onChange={this.handleChange} 
						value={this.state.password} 
						style={{backgroundColor: this.state.passwordColor}}
						title="Entrez votre mot de passe de 8 caractères minimum."
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
					<button>S'inscrire</button>
				</form>
			</React.Fragment>
		);
	}
}

export default SignIn
