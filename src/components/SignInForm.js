import React, { Component, useEffect, useState, useRef } from 'react';
import apiPath from '../apiPath';
import useInput from '../hooks/useInput';

function SignInForm(props) {
	console.log('rendering form')
	const loginsRef = useRef([]);

	const [loginState, setLoginState] = useState(false);
	const [passwordState, setPasswordState] = useState(false);
	const [confirmPasswordState, setConfirmPasswordState] = useState(false);

	const [login, bindLogin, resetLogin] = useInput('');
	const [password, bindPassword, resetPassword] = useInput('');
	const [confirmPassword, bindConfirmPassword, resetConfirmPassword] = useInput('');
	const [email, bindEmail, resetEmail] = useInput('');

	useEffect(() => {
		fetch(`${apiPath}getLogins.php`)
			.then(response => response.json())
			.then(json => {
				loginsRef.current = json.map(item => item.toUpperCase())
			})
	}, []);

	function handleSubmit(event) {
		event.preventDefault();

		if(loginState && passwordState && confirmPasswordState)
		{
			fetch(`${apiPath}signIn.php`, {
				method: 'POST',
				body: JSON.stringify([login, password, email])
			})
				.then(response => response.json())
				.then(json => {
					if(json === true) {
						props.log(login, password);
					} else {
						alert('erreur');
					}
				})
		}
	}

	function handleChange(event) {
		const {name, value} = event.target;
		switch (name)
		{
			case 'login':
				bindLogin.onChange(event);
				loginsRef.current.indexOf(value.toUpperCase()) === -1 ?
				setLoginState(true) :
				setLoginState(false);
				break;
			case 'password':
				bindPassword.onChange(event);
				value.length < 8 ?
				setPasswordState(false) :
				setPasswordState(true);
				break;
			case 'confirmPassword':
				bindConfirmPassword.onChange(event);
				setConfirmPasswordState(password === value ? true : false);
				break;
			case 'email':
				bindEmail.onChange(event);
				break;
		}
	}

	return (
		<React.Fragment>
			<form className="signin-form" onSubmit={handleSubmit}>
				<label>Pseudo
				{!loginState && login.length != 0 &&
					<div className="signin-error_message">Pseudo déjà existant</div>}
				<input 
					type="text" 
					name="login"
					onChange={handleChange} 
					value={login}
					title="Entrez votre pseudo."
					required
				/>
				</label>
				<label>Mot de passe
				{!passwordState && password.length != 0 &&
					<div className="signin-error_message">Mot de passe trop court (8 caractères minimum)</div>}
				<input 
					type="password" 
					name="password" 
					onChange={handleChange} 
					value={password} 
					title="Entrez votre mot de passe de 8 caractères minimum."
					required
				/>
				</label>
				<label>Confirmez mot de passe
				{!confirmPasswordState && confirmPassword.length != 0 &&
					<div className="signin-error_message">Ne correspond pas au mot de passe</div>}
				<input 
					type="password" 
					name="confirmPassword" 
					onChange={handleChange} 
					value={confirmPassword}
					title="Retapez votre mot de passe"
					required
				/>
				</label>
				<label>Mail
				<input 
					type="email" 
					name="email" 
					onChange={handleChange} 
					value={email}
					title="Entre votre mail."
					required 
					/>
				</label>
				<button className="btn">S'inscrire</button>
			</form>
		</React.Fragment>
	);
}

export default SignInForm
