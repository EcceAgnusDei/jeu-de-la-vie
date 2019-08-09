import React, { Component } from 'react';

class SpeedForm extends Component {
	constructor() {
		super();
		this.state = {
			speed: '1'
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({
			speed: event.target.value
		},
			() => this.props.handleSpeed(parseInt(this.state.speed))
		);
	}
	
	render() {
		return (
			<label>Vitesse
				<input 
					type="range" 
					name="speed" 
					min="0.5" 
					max="50" 
					value={this.state.speed}
					onChange={this.handleChange}
				/>
			</label>
		);
	}
}

export default SpeedForm
