import React, { Component } from 'react';
import GolCanvas from '../GolCanvas';

class ArtworkElement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			author: '',
			coords: []
		};
	}

	componentDidMount()
	{
		fetch(`http://localhost/GolApi/getGridById.php?id=${this.props.id}`)
				.then(response => response.text())
				.then(text => {
					const {name, author, json} = JSON.parse(text);
					this.setState({
						name: name,
						author: author,
						coords: JSON.parse(json)
					});
				})
				.catch(error => console.error(error));
	}

	componentDidUpdate()
	{
		let maxX = 0;
		let maxY = 0;
		const grid = new GolCanvas(`miniature${this.props.id}`);

		for (let coord of this.state.coords)
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
		grid.load(this.state.coords);
	}
	
	render() {
		return (
			<div>
				<canvas id={`miniature${this.props.id}`} />
				<h2>{this.state.name} de {this.state.author}</h2>
			</div>
		);
	}
}

export default ArtworkElement
