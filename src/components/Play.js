import React, { Component } from 'react';
import Grid from './Grid';
import Command from './Command';
import GridSizeForm from './GridSizeForm';
import SpeedRange from './SpeedRange';
import GolCanvas from '../GolCanvas';

class Play extends Component {
	constructor() {
		super();
		this.state = {

		};
		this.gameGrid = null;
		this.interval = 1000;

		this.handleCommand = this.handleCommand.bind(this);
		this.handleSizing = this.handleSizing.bind(this);
		this.handleSpeed = this.handleSpeed.bind(this);
	}
	
	componentDidMount() {
		this.gameGrid = new GolCanvas('game-grid');
		this.gameGrid.grid(20, 70, 40);
		this.gameGrid.addEvents();
	}

	handleCommand(command) {
		switch (command)
		{
			case 'play':
				this.gameGrid.play(this.interval);
				break;
			case 'pause':
				this.gameGrid.stop();
				break;
			case 'next':
				this.gameGrid.next();
				break;
			case 'rubber':
				this.gameGrid.switchColor();
				break;
			case 'save':
				this.gameGrid.save();
				break;
			case 'load':
				this.gameGrid.load();
				break;
		}
	}

	handleSizing(squareSize, cols, rows)
	{
		this.gameGrid.grid(squareSize, cols, rows);
	}

	handleSpeed(speed)
	{
		this.interval = 1000 / speed;
		if(this.gameGrid.isPlaying)
		{
			this.gameGrid.stop();
			this.gameGrid.play(this.interval);
		}
	}

	render() {
		return (
			<main>
				<Grid />
				<Command handleCommand={this.handleCommand} />
				<GridSizeForm handleSizing={this.handleSizing} />
				<SpeedRange handleSpeed={this.handleSpeed} />
			</main>
		);
	}
}

export default Play
