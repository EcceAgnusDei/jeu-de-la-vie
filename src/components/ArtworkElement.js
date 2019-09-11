import React, { useEffect, useReducer, useRef, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import GolCanvas from '../GolCanvas';
import ArtworkContext from '../context/artworkContext';
import apiPath from '../apiPath';
import SwitchVisibility from './SwitchVisibility';

const initialState = {
	data: {
		id: 0,
		name: '',
		author: '',
		coords: [],
		likes: 0,
		client_visibility: false,
		visibility: false
	},
	loading: true,
	hasDbError: false
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_SUCCESS':
			return {
				...state,
				loading: false,
				hasDbError: false,
				data: { 
					...action.data,
					coords: JSON.parse(action.data.coords)
				}
			}
			break;
		case 'FETCH_ERROR':
			return {
				...state,
				loading: false,
				hasDbError: true	
			}
			break;
		default:
			return state;
	}
}

function ArtworkElement(props) {

	const [state, dispatch] = useReducer(reducer, initialState);
	const canvasRef = useRef(null);
	const artworkLoad = useContext(ArtworkContext);
	
	useEffect(() => {
		fetch(`${apiPath}getGridById.php`, {
		  method: 'post',
		  body: JSON.stringify(props.id)
		})
		.then(response => response.json())
		.then(json => dispatch({ type: 'FETCH_SUCCESS', data: json}))
		.catch(error => {dispatch({ type: 'FETCH_ERROR'})});
	}, [])

	useEffect(() => {
		if(canvasRef.current)
		{
			let maxX = 0;
			let maxY = 0;
			const grid = new GolCanvas(`miniature${props.id}`);

			for (let coord of state.data.coords)
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

			grid.grid(7, maxX +5, maxY +5);
			grid.load(state.data.coords);	
		}
	})
	
	if (state.hasDbError)
	{
		throw new Error('Impossible de se connecter à la base de données');
	}
	return (
		<div className="artwork-item">
			{state.loading ? <div className="loading"><i className="fas fa-spinner"></i></div> :
			<React.Fragment>
				<canvas ref={canvasRef} className="grid-miniature" id={`miniature${props.id}`} />
				<div className="blue">
					{state.data.likes} <i className="far fa-thumbs-up"></i>
				</div>
				<div>
					<button className="artwork-btn" onClick={() => props.history.push(`/jouer/${props.id}`)}>
					<em>{state.data.name}</em> de {state.data.author}
					</button>
				</div>
				{(props.userSpace || props.admin) && 
				<div className="artworks-item-command">
					<SwitchVisibility checked={state.data.client_visibility} span="Publier" id={props.id} />
					{props.admin &&
					<SwitchVisibility checked={state.data.visibility} id={props.id} span="Approuver" invert />}
					<button className="danger-btn" onClick={() => props.deleteGrid(props.id)}>Supprimer</button>
				</div>}
			</React.Fragment>}
		</div>
	);
}

export default withRouter(ArtworkElement);
