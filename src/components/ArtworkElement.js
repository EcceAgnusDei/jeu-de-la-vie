import React, { Component } from 'react';
import GolCanvas from '../GolCanvas';
import { ArtworkConsumer } from '../context/artworkContext'

class ArtworkElement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: 0,
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
					const {name, author, json, id} = JSON.parse(text);
					this.setState({
						id: id,
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
				<ArtworkConsumer>
				{
					(value) => {
						return <h2 onClick={() => value(this.state)}>{this.state.name} de {this.state.author}</h2>
					}
				}
				</ArtworkConsumer>
			</div>
		);
	}
}

export default ArtworkElement
