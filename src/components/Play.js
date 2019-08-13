import React, { Component } from 'react';
import Grid from './Grid';
import Command from './Command';
import GridSizeForm from './GridSizeForm';
import SpeedRange from './SpeedRange';
import Comments from './Comments';
import SaveGridForm from './SaveGridForm';
import GolCanvas from '../GolCanvas';

class Play extends Component {
	constructor(props) {
		super(props);
		this.state = {
			likes: 0,
			likers: [],
			coords: []
		};
		this.gameGrid = null;
		this.interval = 1000;

		this.handleCommand = this.handleCommand.bind(this);
		this.handleSizing = this.handleSizing.bind(this);
		this.handleSpeed = this.handleSpeed.bind(this);
		this.load = this.load.bind(this);
		this.loadLikes = this.loadLikes.bind(this);
		this.like = this.like.bind(this);
		this.isLiked = this.isLiked.bind(this);
		this.dbSave = this.dbSave.bind(this);
	}
	
	componentDidMount() {
		this.gameGrid = new GolCanvas('game-grid');
		this.gameGrid.addEvents();

		this.props.artwork.name ?
		this.load() :
		this.gameGrid.grid(20, 70, 40);

		this.loadLikes();
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

	load()
	{
		let maxX = 0;
		let maxY = 0;

		for (let coord of this.props.artwork.coords)
		{
			if (coord[0] > maxX)
			{
				maxX = coord[0];
			}
			if (coord[1] > maxY)
			{
				maxY = coord[1];
			}
		}

		this.gameGrid.grid(20, maxX +10, maxY +10);
		this.gameGrid.saved = this.props.artwork.coords;
		this.gameGrid.load();
	}

	like()
	{
		fetch(`http://localhost/GolApi/likeGrid.php?gridId=${this.props.artwork.id}&userId=${this.props.userId}`)
			.then(response => response.json())
			.then(json => {
				if(json === true)
				{
					this.loadLikes();
				} else {
					alert('erreur');
				}
			});
	}

	loadLikes()
	{
		fetch(`http://localhost/GolApi/getGridLikes.php?id=${this.props.artwork.id}`)
			.then(response => response.json())
			.then(json => {
				this.setState({likes: json.likes, likers: json.likers});
			});
	}

	isLiked()
	{
		if(this.state.likers.indexOf(this.props.userId + '') === -1) {
			return false;
		} else {
			return true;
		}
	}

	dbSave(title)
	{
		this.handleCommand('save');

		fetch('http://localhost/GolApi/addGrid.php', {
			method: 'POST',
			body: JSON.stringify([this.gameGrid.saved, this.props.userId, title])
		})
		.then(response => response.json())
		.then(json => {
			if(json) {
				this.props.handleNav('Espace perso');
			} else {
				alert('Erreur');
			}
		});
	}

	render() {
		console.log(this.isLiked());
		return (
			<main>
				{
					this.props.artwork.name ?
					<div>
						<h1>{this.props.artwork.name} de {this.props.artwork.author}</h1> 
						<div>
							{<button title={this.isLiked() ? "Je n'aime plus" : "J'aime"} onClick={this.like}>like</button>}
							{this.state.likes}
						</div>
					</div> :
					<h1>A vous de jouer au jeu de la vie !</h1>
				}
				<Grid />
				<Command handleCommand={this.handleCommand} />
				<GridSizeForm handleSizing={this.handleSizing} />
				<SpeedRange handleSpeed={this.handleSpeed} />
				{!this.props.artwork.name && this.props.userId && <SaveGridForm save={this.dbSave}/>}
				{this.props.artwork.name && <Comments gridId={this.props.artwork.id} userId={this.props.userId} />}
			</main>
		);
	}
}

export default Play
