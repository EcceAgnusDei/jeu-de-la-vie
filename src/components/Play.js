import React, { useState, useEffect, useRef } from 'react';
import Grid from './Grid';
import Command from './Command';
import GridSizeForm from './GridSizeForm';
import SpeedRange from './SpeedRange';
import Comments from './Comments';
import SaveGridForm from './SaveGridForm';
import GolCanvas from '../GolCanvas';
import apiPath from '../apiPath';

// class Playy extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			likes: 0,
// 			likers: [],
// 			coords: []
// 		};
// 		this.gameGrid = null;
// 		this.interval = 1000;

// 		this.handleCommand = this.handleCommand.bind(this);
// 		this.handleSizing = this.handleSizing.bind(this);
// 		this.handleSpeed = this.handleSpeed.bind(this);
// 		this.load = this.load.bind(this);
// 		this.loadLikes = this.loadLikes.bind(this);
// 		this.like = this.like.bind(this);
// 		this.isLiked = this.isLiked.bind(this);
// 		this.dbSave = this.dbSave.bind(this);
// 	}
	
// 	componentDidMount() {
// 		this.gameGrid = new GolCanvas('game-grid');
// 		this.gameGrid.addEvents();

// 		this.props.artwork.name ?
// 		this.load() :
// 		this.gameGrid.grid(20, 70, 40);

// 		this.loadLikes();
// 	}

// 	handleCommand(command) {
// 		switch (command)
// 		{
// 			case 'play':
// 				this.gameGrid.play(this.interval);
// 				break;
// 			case 'pause':
// 				this.gameGrid.stop();
// 				break;
// 			case 'next':
// 				this.gameGrid.next();
// 				break;
// 			case 'rubber':
// 				this.gameGrid.switchColor();
// 				break;
// 			case 'save':
// 				this.gameGrid.save();
// 				break;
// 			case 'load':
// 				this.gameGrid.load();
// 				break;
// 		}
// 	}

// 	handleSizing(squareSize, cols, rows)
// 	{
// 		this.gameGrid.grid(squareSize, cols, rows);
// 	}

// 	handleSpeed(speed)
// 	{
// 		this.interval = 1000 / speed;
// 		if(this.gameGrid.isPlaying)
// 		{
// 			this.gameGrid.stop();
// 			this.gameGrid.play(this.interval);
// 		}
// 	}

// 	load()
// 	{
// 		let maxX = 0;
// 		let maxY = 0;

// 		for (let coord of this.props.artwork.coords)
// 		{
// 			if (coord[0] > maxX)
// 			{
// 				maxX = coord[0];
// 			}
// 			if (coord[1] > maxY)
// 			{
// 				maxY = coord[1];
// 			}
// 		}

// 		this.gameGrid.grid(20, maxX +10, maxY +10);
// 		this.gameGrid.saved = this.props.artwork.coords;
// 		this.gameGrid.load();
// 	}

// 	like()
// 	{
// 		fetch(`${apiPath}likeGrid.php`, {
// 			method: 'post',
// 			body: JSON.stringify([this.props.artwork.id, this.props.userId])
// 		})
// 			.then(response => response.json())
// 			.then(json => {
// 				if(json === true)
// 				{
// 					this.loadLikes();
// 				} else {
// 					alert('erreur');
// 				}
// 			})
// 	}

// 	loadLikes()
// 	{
// 		fetch(`${apiPath}getGridLikes.php`, {
// 			method: 'post',
// 			body: JSON.stringify(this.props.artwork.id)
// 		})
// 			.then(response => response.json())
// 			.then(json => {
// 				this.setState({likes: json.likes, likers: json.likers});
// 			})
// 	}

// 	isLiked()
// 	{
// 		if(this.state.likers.indexOf(this.props.userId + '') === -1) {
// 			return false;
// 		} else {
// 			return true;
// 		}
// 	}

// 	dbSave(title)
// 	{
// 		this.handleCommand('save');

// 		fetch(`${apiPath}addGrid.php`, {
// 			method: 'POST',
// 			body: JSON.stringify([this.gameGrid.saved, this.props.userId, title])
// 		})
// 		.then(response => response.json())
// 		.then(json => {
// 			if(json) {
// 				this.props.handleNav('Espace perso');
// 			} else {
// 				alert('Erreur');
// 			}
// 		})
// 	}

// 	render() {
// 		return (
// 			<React.Fragment>
// 				{
// 					this.props.artwork.name ?
// 					<div>
// 						<h1 className="load_grid-title">{this.props.artwork.name} de {this.props.artwork.author}</h1> 
// 						<div className={this.isLiked() ? 'loaded_grid-like blue' : 'loaded_grid-like'}>
// 							{this.props.userId != 0 ? 
// 								<button 
// 									title={this.isLiked() ? "Je n'aime plus" : "J'aime"} 
// 									onClick={this.like}
// 									className="like-btn"
// 								>
// 									<i className="far fa-thumbs-up"></i>
// 								</button> :
// 								<i className="far fa-thumbs-up"></i>
// 							}
// 							{this.state.likes}
// 						</div>
// 					</div> :
// 					<h1>A vous de jouer au jeu de la vie !</h1>
// 				}
// 				<div className="grid-container"><Grid /></div>
// 				<Command handleCommand={this.handleCommand} />
// 				<GridSizeForm handleSizing={this.handleSizing} />
// 				<SpeedRange handleSpeed={this.handleSpeed} />
// 				{!this.props.artwork.name && this.props.userId != 0 && <SaveGridForm save={this.dbSave}/>}
// 				{this.props.artwork.name && <Comments gridId={this.props.artwork.id} userId={this.props.userId} />}
// 			</React.Fragment>
// 		);
// 	}
// }

function Play(props) {
	const [likes, setLikes] = useState(0);
	const [likers, setLikers] = useState([]);
	const [coords, setCoords] = useState([]);

	const gameGridRef = useRef(null);
	const intervalRef = useRef(1000);

	useEffect(() => {
		gameGridRef.current = new GolCanvas('game-grid');
		gameGridRef.current.addEvents();

		props.artwork.name ?
		load() :
		gameGridRef.current.grid(20, 70, 40);

		loadLikes();
	}, [])

	function handleCommand(command) {
		switch (command)
		{
			case 'play':
				gameGridRef.current.play(intervalRef.current);
				break;
			case 'pause':
				gameGridRef.current.stop();
				break;
			case 'next':
				gameGridRef.current.next();
				break;
			case 'rubber':
				gameGridRef.current.switchColor();
				break;
			case 'save':
				gameGridRef.current.save();
				break;
			case 'load':
				gameGridRef.current.load();
				break;
		}
	}

	function handleSizing(squareSize, cols, rows)
	{
		gameGridRef.current.grid(squareSize, cols, rows);
		gameGridRef.current.load();
	}

	function handleSpeed(speed)
	{
		console.log(speed);
		intervalRef.current = 1000 / speed;
		if(gameGridRef.current && gameGridRef.current.isPlaying)
		{
			gameGridRef.current.stop();
			gameGridRef.current.play(intervalRef.current);
		}
	}

	function load()
	{
		let maxX = 0;
		let maxY = 0;

		for (let coord of props.artwork.coords)
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

		gameGridRef.current.grid(20, maxX +10, maxY +10);
		gameGridRef.current.saved = props.artwork.coords;
		gameGridRef.current.load();
	}

	function like()
	{
		fetch(`${apiPath}likeGrid.php`, {
			method: 'post',
			body: JSON.stringify([props.artwork.id, props.userId])
		})
			.then(response => response.json())
			.then(json => {
				if(json === true)
				{
					loadLikes();
				} else {
					alert('erreur');
				}
			})
	}

	function loadLikes()
	{
		fetch(`${apiPath}getGridLikes.php`, {
			method: 'post',
			body: JSON.stringify(props.artwork.id)
		})
			.then(response => response.json())
			.then(json => {
				setLikes(json.likes);
				setLikers(json.likers);
			})
	}

	function isLiked()
	{
		if(likers.indexOf(props.userId + '') === -1) {
			return false;
		} else {
			return true;
		}
	}

	function dbSave(title)
	{
		handleCommand('save');

		fetch(`${apiPath}addGrid.php`, {
			method: 'POST',
			body: JSON.stringify([gameGridRef.current.saved, props.userId, title])
		})
		.then(response => response.json())
		.then(json => {
			if(json) {
				props.handleNav('Espace perso');
			} else {
				alert('Erreur');
			}
		})
	}

	return (
		<React.Fragment>
			{
				props.artwork.name ?
				<div>
					<h1 className="load_grid-title">{props.artwork.name} de {props.artwork.author}</h1> 
					<div className={isLiked() ? 'loaded_grid-like blue' : 'loaded_grid-like'}>
						{props.userId != 0 ? 
							<button 
								title={isLiked() ? "Je n'aime plus" : "J'aime"} 
								onClick={like}
								className="like-btn"
							>
								<i className="far fa-thumbs-up"></i>
							</button> :
							<i className="far fa-thumbs-up"></i>
						}
						{likes}
					</div>
				</div> :
				<h1>A vous de jouer au jeu de la vie !</h1>
			}
			<div className="grid-container"><Grid /></div>
			<Command handleCommand={handleCommand} />
			<GridSizeForm handleSizing={handleSizing} />
			<SpeedRange handleSpeed={handleSpeed} />
			{!props.artwork.name && props.userId != 0 && <SaveGridForm save={dbSave}/>}
			{props.artwork.name && <Comments gridId={props.artwork.id} userId={props.userId} />}
		</React.Fragment>
	);
}

export default Play;
