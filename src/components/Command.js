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
		const playJSX = this.state.playAction == 'play' ? <i className="fas fa-play"></i> : <i className="fas fa-pause"></i>;
		const rubberJSX = this.state.rubberDisplay ? <i className="fas fa-eraser"></i> : <i className="fas fa-pencil-alt"></i>;
		return (
			<div className="command">
				<div className="command-item">
					<button className="command-btn" name={this.state.playAction} onClick={this.handleClick}>
						{playJSX}
					</button>
					<button className="command-btn" name="next" onClick={this.handleClick}>
						<i className="fas fa-step-forward"></i>
					</button>
					<button className="command-btn" name="rubber" onClick={this.handleClick}>
						{rubberJSX}
					</button>
				</div>
				<div className="command-item">
					<button className="command-btn" name="save" onClick={this.handleClick}>Enregistrer</button>
					<button className="command-btn" name="load" onClick={this.handleClick}>Charger</button>
				</div>
			</div>
		);
	}
}

export default Command
