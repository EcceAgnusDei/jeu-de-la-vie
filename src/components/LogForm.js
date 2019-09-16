import React, { Component } from 'react';
import { connect } from 'react-redux';

import useInput from '../hooks/useInput';
import { login } from '../actions/userActions'

function LogForm(props) {
	const [pseudo, bindPseudo, resetPseudo] = useInput('');
 	const [password, bindPassword, resetPassword] = useInput('');

	function handleSubmit(event)
	{
		event.preventDefault();
		props.login(pseudo, password);
	}

	return (
		<form className="log-form" onSubmit={handleSubmit}>
			<div className="input-container">
				<label>Login
					<input 
						type="text" 
						name="login" 
						{...bindPseudo} 
						required
					/>
				</label>
				<label>Mot de passe
					<input 
						type="password" 
						name="password" 
						{...bindPassword} 
						required
					/>
				</label>
			</div>	
			<button className="danger-btn">Go</button>
		</form>
	);
}


const mapDispatchToProps = (dispatch) => {
	return {
		login: (pseudo, password) => dispatch(login(pseudo, password))
	}
}

export default connect(null, mapDispatchToProps)(LogForm);
