import React, { Component } from 'react';
import ArtworksNav from './ArtworksNav';
import ArtworkElement from './ArtworkElement';

class Artworks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allIds: [],
			visibleIds: []
		};

		this.page = 0;
		this.elementPerPage = 8;
		this.navigationVisibility = {next: true, prev: false}
		this.maxPage = 0;

		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
	}

	componentDidMount()
	{
		let API = '';
		let init = {};
		if(this.props.userSpace)
		{
			API  = 'getUserGridsId';
			init = {method: 'POST', body: this.props.userId};
		} else {
			API = 'getAllGridsId';
		}

		fetch(`http://localhost/GolApi/${API}.php`, init)
			.then(response => response.text())
			.then(text => {
				this.setState({allIds: JSON.parse(text), visibleIds: JSON.parse(text).slice(0, this.elementPerPage)},
					() => {this.maxPage = Math.floor(this.state.allIds.length / this.elementPerPage)}
				); //gérer le cas ou il y a moins de 8 créations
			})
			.catch(error => console.error(error));
	}
	
	next()
	{
		console.log(this.maxPage);
		this.page++;
		this.page === this.maxPage ? this.navigationVisibility.next = false : this.navigationVisibility.next = true;
		this.navigationVisibility.prev = true;
		this.setState((prevState) => {
			return {visibleIds: prevState.allIds.slice(this.page * this.elementPerPage, (this.page + 1) * this.elementPerPage)}
		});
	}

	prev()
	{
		console.log('prev');
		this.page--;
		this.page === 0 ? this.navigationVisibility.prev = false : this.navigationVisibility.prev = true
		this.navigationVisibility.next = true;
		this.setState((prevState) => {
			return {visibleIds: prevState.allIds.slice(this.page * this.elementPerPage, (this.page + 1) * this.elementPerPage)}
		});
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
				<ArtworksNav next={this.next} prev={this.prev} visibility={this.navigationVisibility}/>
			</div>
		);
	}
}

export default Artworks
