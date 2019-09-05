import React from 'react';
import useInput from '../hooks/useInput';

function SaveGridForm(props) {

	const [title, bindTitle, resetTitle] = useInput('');

	function handleSubmit(event)
	{
		event.preventDefault();

		props.save(title);
	}

	return (
		<React.Fragment>
			<h2>Enregistrer votre création</h2>
			<form className="save_grid-form" onSubmit={handleSubmit}>
				<label>Nom de votre population
				<input 
					type="text" 
					title="Donnez un nom à votre population."
					name="title" 
					{...bindTitle} 
					required 
				/>
				</label>
				<button className="btn">Enregistrer</button>
			</form>
		</React.Fragment>
	);
}

export default SaveGridForm;