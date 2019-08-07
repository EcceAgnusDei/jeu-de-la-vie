import React, { Component } from 'react';
import Grid from './Grid';
import Command from './Command';
import GridSizeForm from './GridSizeForm';
import GolCanvas from '../GolCanvas';

class Play extends Component {
	constructor() {
		super();
		this.state = {

		};
		this.gameGrid = null;

		this.handleCommand = this.handleCommand.bind(this);
		this.handleSizing = this.handleSizing.bind(this);
	}
	
	componentDidMount() {
		this.gameGrid = new GolCanvas('game-grid');
		this.gameGrid.grid(20, 10, 10);
		this.gameGrid.addEvents();
	}

	handleCommand(command) {
		switch (command)
		{
			case 'play':
				this.gameGrid.play(500);
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
		console.log(squareSize, cols, rows);
		this.gameGrid.grid(squareSize, cols, rows);
	}

	render() {
		return (
			<main>
				<Grid />
				<Command handleCommand={this.handleCommand}/>
				<GridSizeForm handleSizing={this.handleSizing}/>
			</main>
		);
	}
}

export default Play
