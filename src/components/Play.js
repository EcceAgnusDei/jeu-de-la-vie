import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import Grid from './Grid';
import Command from './Command';
import GridSizeForm from './GridSizeForm';
import SpeedRange from './SpeedRange';
import Comments from './Comments';
import SaveGridForm from './SaveGridForm';
import GolCanvas from '../GolCanvas';
import apiPath from '../apiPath';

function Play(props) {
	console.log('Rendering play')
	const [likes, setLikes] = useState(0);
	const [likers, setLikers] = useState([]);
	const [artwork, setArtwork] = useState({});


	const gameGridRef = useRef(null);
	const intervalRef = useRef(1000);

	useEffect(() => {
		gameGridRef.current = new GolCanvas('game-grid');
		gameGridRef.current.addEvents();
		if (props.match.params.id) {
			artworkFetch(props.match.params.id);
			loadLikes();
		} else {
			gameGridRef.current.grid(20, 70, 40);
		}
	}, [])

	useEffect(() => {
		if (artwork.coords)
		{
			load();
		}
	}, [artwork])

	function artworkFetch(id)
  	{
		fetch(`${apiPath}getGridById.php`, {
		  method: 'post',
		  body: JSON.stringify(id)
		})
		.then(response => response.json())
		.then(json => setArtwork({...json, coords: JSON.parse(json.coords)}))
		.catch(() => alert('Une erreur est survenue...'));
  	}

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

		for (let coord of artwork.coords)
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
		gameGridRef.current.saved = artwork.coords;
		gameGridRef.current.load();
	}

	function like()
	{
		fetch(`${apiPath}likeGrid.php`, {
			method: 'post',
			body: JSON.stringify([props.match.params.id, props.userId])
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
			body: JSON.stringify(props.match.params.id)
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
				props.history.push('/espace-perso');
			} else {
				alert('Erreur');
			}
		})
	}

	return (
		<React.Fragment>
			{
				props.match.params.id ?
				<div>
					<h1 className="load_grid-title">{artwork.name} de {artwork.author}</h1> 
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
			{!props.match.params.id && props.userId != 0 &&
			<SaveGridForm save={dbSave}/>}
			{props.match.params.id && 
			<Comments gridId={artwork.id} userId={props.userId} />}
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		userId: state.user
	}
}

export default connect(mapStateToProps, null)(Play);

