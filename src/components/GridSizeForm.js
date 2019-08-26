import React, { Component } from 'react';

class GridSizeForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cols: '70',
			rows: '40',
			squareSize: '20',
			tooBig: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	
	handleSubmit(event)
	{
		event.preventDefault();
		
		if (this.state.cols * this.state.rows > 20000)
		{
			this.setState({tooBig: true});
		} else {
			this.props.handleSizing(parseInt(this.state.squareSize), parseInt(this.state.cols), parseInt(this.state.rows));
		}
	}

	handleChange(event)
	{
		const {name, value} = event.target
		this.setState({[name]: value});
	}

	render() {
		return (
			<React.Fragment>
				<form className="grid_size-form" onSubmit={this.handleSubmit}>
					<label>Colonnes
						<input type="text" name="cols" value={this.state.cols} onChange={this.handleChange}/>
					</label>
					<label>Lignes
						<input type="text" name="rows" value={this.state.rows} onChange={this.handleChange}/>
					</label>
					<label>Taille des carrés
						<input type="text" name="squareSize" value={this.state.squareSize} onChange={this.handleChange}/>
					</label>
					<button className="btn">Afficher la grille</button>
				</form>
				{this.state.tooBig &&
				<div className="grid_size-error">La grille est trop grande!</div>
				}
			</React.Fragment>
		);
	}
}

export default GridSizeForm
