import React, { Component } from 'react';

class Command extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playAction: 'play',
			rubberDisplay: true
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event)
	{	
		if (event.target.name === 'play' || event.target.name === 'pause') {
			this.setState((prevState) => {
				return {playAction: prevState.playAction === 'pause' ? 'play' : 'pause'}
			});
		} else if (event.target.name === 'rubber') {
			this.setState((prevState) => {
				return {rubberDisplay: !prevState.rubberDisplay}
			});
		}
		
		this.props.handleCommand(event.target.name);
	}
	
	render() {
		return (
			<div>
				<div>
					<button name={this.state.playAction} onClick={this.handleClick}>{this.state.playAction}</button>
					<button name="next" onClick={this.handleClick}>Next</button>
					<button name="rubber" onClick={this.handleClick}>{
						this.state.rubberDisplay ?
						'Rubber' :
						'Pen'
					}</button>
				</div>
				<div>
					<button name="save" onClick={this.handleClick}>Enregistrer</button>
					<button name="load" onClick={this.handleClick}>Charger</button>
				</div>

			</div>
		);
	}
}

export default Command
