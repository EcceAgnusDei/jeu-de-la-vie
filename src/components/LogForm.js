import React, { Component } from 'react';
import useInput from '../hooks/useInput';

function LogForm(props) {
	const [login, bindLogin, resetLogin] = useInput('');
 	const [password, bindPassword, resetPassword] = useInput('');

	function handleSubmit(event)
	{
		event.preventDefault();
		props.log(login, password);
	}

	return (
		<form className="log-form" onSubmit={handleSubmit}>
			<div className="input-container">
				<label>Login
					<input 
						type="text" 
						name="login" 
						{...bindLogin} 
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

export default LogForm
