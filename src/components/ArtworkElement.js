import React, { Component } from 'react';
import GolCanvas from '../GolCanvas';
import { ArtworkConsumer } from '../context/artworkContext'
import apiPath from '../apiPath';

class ArtworkElement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: 0,
			name: '',
			author: '',
			coords: [],
			likes: 0
		};
	}

	componentDidMount()
	{
		fetch(`${apiPath}getGridById.php`, {
			method: 'post',
			body: JSON.stringify(this.props.id)
		})
		.then(response => response.json())
		.then(respjson => {
			const {name, author, json, id, likes} = respjson;
			this.setState({
				id: id,
				name: name,
				author: author,
				coords: JSON.parse(json),
				likes: likes
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
			<div className="artwork-item">
				<canvas className="grid-miniature" id={`miniature${this.props.id}`} />
				<div className="blue">
					{this.state.likes} <i className="far fa-thumbs-up"></i>
				</div>
				<ArtworkConsumer>
				{
					(value) => {
						return <div>
							<button className="artwork-btn" onClick={() => value(this.state)}>
							{this.state.name} de {this.state.author}
							</button>
						</div>
					}
				}
				</ArtworkConsumer>
				{this.props.userSpace && 
				<button className="danger-btn" onClick={() => this.props.deleteGrid(this.props.id)}>Supprimer</button>}
			</div>
		);
	}
}

export default ArtworkElement
