import React, { useReducer, useEffect, useRef } from 'react';
import ArtworksNav from './ArtworksNav';
import ArtworkElement from './ArtworkElement';
import ErrorBoundary from './ErrorBoundary';
import apiPath from '../apiPath';

const initialState = {
	allIds: [],
	visibleIds: [],
	hasDbError: false,
	loading: true,
	maxPage: 0
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'nav':
			return {
				...state,
				visibleIds: action.visibleIds
			}
			break;
		case 'loading':
			return {
				...state,
				loading: true
			}
			break;
		case 'getIds':
			return {
				...state,
				allIds: action.data.ids,
				loading: false,
				maxPage: action.data.maxPage,
				hasDbError: false,
				visibleIds: action.data.visibleIds
			}
			break;
		case 'FETCHING_ERROR':
			return {
				...state,
				hasDbError: true
			}
			break;
		case 'updateVisible':
			return {
				...state,
				allIds: action.data.allIds,
				visibleIds: action.data.visibleIds
			}
			break;
		default: 
			return state;
	}
}

function Artworks(props) {

	const elementPerPage = 8;
	const menu = ['Les dernières création', 'Les plus populaires'];
	const pageRef = useRef(0);
	const sortRef = useRef('date');

	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		getIds();
	}, [])

	if (state.hasDbError)
	{
		throw new Error('Impossible de se connecter à la base de données');
	}

	function getIds()
	{
		dispatch({ type: 'loading' });
		let API = '';
		let init = {};
		if(props.userSpace)
		{
			API  = 'getUserGridsId';
			init = {method: 'POST', body: props.userId};
		} else {
			API = 'getAllGridsId';
		}

		fetch(`${apiPath}${API}.php`, init)
			.then(response => response.json())
			.then(json => {
				dispatch({ 
					type: 'getIds', 
					data: {
						ids: json,
						maxPage: Math.floor(json.length / elementPerPage),
						visibleIds: json.slice(0, elementPerPage)
					} 
				})
			})
			.catch(() => dispatch({ type: 'FETCHING_ERROR' }));
	}

	function next()
	{
		pageRef.current++;
		dispatch({ 
			type: 'nav',
			visibleIds: state.allIds.slice(pageRef.current * elementPerPage, (pageRef.current + 1) * elementPerPage)
		});
	}

	function prev()
	{
		pageRef.current--;
		dispatch({ 
			type: 'nav',
			visibleIds: state.allIds.slice(pageRef.current * elementPerPage, (pageRef.current + 1) * elementPerPage)
		});
	}

	function deleteGrid(id)
	{	
		if(window.confirm('Voulez-vous supprimer votre création ?'))
		{
			fetch(`${apiPath}deleteGrid.php`, {
	      		method: 'post',
	      		body: id
	    	})
			.then(response => response.json())
			.then(json => {
				json ? getIds() : alert('erreur');
			})
			.catch(() => dispatch({ type: 'FETCHING_ERROR' }));
		}
	}

	function handleNav(link) {
		if(link === menu[0]) {
			sortByDate();
		}
		else if(link === menu[1]) {
			sortByLikes();
		}
	}

	function sortByDate()
	{
		pageRef.current = 0;
		function compare(a, b) {
			let comparison = 0;
			if(a.id > b.id) {
				comparison = -1;
			}
			else if (a.id < b.id){
				comparison = 1;
			}
			return comparison;
		}

		const array = [...state.allIds];
		array.sort(compare);

		sortRef.current = 'date';
		dispatch({
			type: 'updateVisible',
			data: {
				allIds: array, 
				visibleIds: array.slice(0, elementPerPage)
			}
		});
	}

	function sortByLikes()
	{
		pageRef.current = 0;
		function compare(a, b) {
			let comparison = 0;
			if(a.likes > b.likes) {
				comparison = -1;
			}
			else if (a.likes < b.likes){
				comparison = 1;
			}
			return comparison;
		}

		const array = [...state.allIds];
		array.sort(compare);

		sortRef.current = 'likes'
		dispatch({
			type: 'updateVisible',
			data: {
				allIds: array, 
				visibleIds: array.slice(0, elementPerPage)
			}
		});
	}

	const gridsJSX = state.visibleIds.map( item => 
		<ArtworkElement 
			deleteGrid={deleteGrid} 
			key={item.id} id={item.id} 
			userSpace={props.userSpace} 
			elementPerPage={elementPerPage} 
		/>);
	const menuJSX = menu.map(item =>
		<li key={item}>
			<button 
			className="menu-btn" 
			onClick={() => handleNav(item)}
			>
			{item} 
			{<i className="fas fa-sort-down"></i>}
			</button>
		</li>
	);
	return (
		<React.Fragment>
			<nav>
				<ul className="artworks-menu">
					<li>
						<button 
							className="menu-btn" 
							onClick={() => handleNav(menu[0])}
						>
						{menu[0]} {sortRef.current === 'date' && <i className="fas fa-sort-down"></i>}
						</button>
					</li>
					<li>
						<button 
							className="menu-btn" 
							onClick={() => handleNav(menu[1])}
						>
						{menu[1]} {sortRef.current === 'likes' && <i className="fas fa-sort-down"></i>}
						</button>
					</li>
				</ul>
			</nav>
			<div className="artworks">
			{
				state.loading ? 
				<div className="loading"><i className="fas fa-spinner"></i></div> :
				<React.Fragment>
				{gridsJSX}
				</React.Fragment>
			}
			</div>
			<ArtworksNav next={next} prev={prev} currentPage={pageRef.current} maxPage={state.maxPage}/>
		</React.Fragment>
	);
}

export default Artworks
