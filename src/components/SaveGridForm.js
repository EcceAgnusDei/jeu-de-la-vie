import React, { Component } from 'react';

class SaveGridForm extends Component {
	constructor() {
		super();
		this.state = {
			title: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event)
	{
		this.setState({title: event.target.value});
	}

	handleSubmit(event)
	{
		event.preventDefault();

		this.props.save(this.state.title);
	}
	
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<h2>Enregistrer votre création</h2>
				<label>Nom de votre population
					<input 
					type="text" 
					title="Donnez un nom à votre population."
					name="title" 
					value={this.state.title} 
					onChange={this.handleChange} 
					required 
					/>
				</label>
				<button className="btn">Enregistrer</button>
			</form>
		);
	}
}

export default SaveGridForm
