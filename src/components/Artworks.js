import React, { Component } from 'react';
import ArtworksNav from './ArtworksNav';
import ArtworkElement from './ArtworkElement';

class Artworks extends Component {
	constructor() {
		super();
		this.state = {
			allIds: [],
			visibleIds: []
		};
	}

	componentDidMount()
	{
		fetch('http://localhost/GolApi/getAllGridsId.php')
			.then(response => response.text())
			.then(text => {
				this.setState({allIds: JSON.parse(text), visibleIds: JSON.parse(text).slice(0, 8)}) //gérer le cas ou il y a moins de 8 créations
				}
			)
			.catch(error => console.error(error));
	}

	getVisibles()
	{
		const grids = [];
		for (let id of this.state.visibleIds)
		{
			fetch(`http://localhost/GolApi/getGridById.php?id=${id}`)
				.then(response => response.text())
				.then(text => grids.push(JSON.parse(text)))
				.catch(error => console.error(error));
		}
		console.log(grids);
		return grids;
	}
	
	render() {
		const gridsJSX = this.state.visibleIds.map( id =>
			 <ArtworkElement key={id} id={id} />
		);
		return (
			<div>
				<main>
					{gridsJSX}
				</main>
				<ArtworksNav />
			</div>
		);
	}
}

export default Artworks
