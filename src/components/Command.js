import React, { Component } from 'react';

class Command extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playAction: 'play'
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event)
	{	
		if (event.target.name === 'play' || event.target.name === 'pause') {
			this.setState((prevState) => {
			return {playAction: prevState.playAction === 'pause' ? 'play' : 'pause'}
			});
		}
		
		this.props.handleCommand(event.target.name);
	}
	
	render() {
		return (
			<div>
				<button name={this.state.playAction} onClick={this.handleClick}>{this.state.playAction}</button>
				<button name="next" onClick={this.handleClick}>Next</button>
			</div>
		);
	}
}

export default Command
