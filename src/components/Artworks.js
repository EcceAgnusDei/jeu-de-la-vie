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
		this.menu = ['Les dernières création', 'Les plus populaires'];

		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
		this.sortByLikes = this.sortByLikes.bind(this);
		this.sortByDate = this.sortByDate.bind(this);
		this.handleNav = this.handleNav.bind(this);
	}

	sortByLikes()
	{
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

		const array = [...this.state.allIds];
		array.sort(compare);

		this.setState({allIds: array, visibleIds: array.slice(0, this.elementPerPage)});
	}

	sortByDate()
	{
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

		const array = [...this.state.allIds];
		array.sort(compare);

		this.setState({allIds: array, visibleIds: array.slice(0, this.elementPerPage)});
	}

	handleNav(link) {
		if(link === this.menu[0]) {
			this.sortByDate();
		}
		else if(link === this.menu[1]) {
			this.sortByLikes();
		}
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
			.then(response => response.json())
			.then(json => {

				this.setState({allIds: json, visibleIds: json.slice(0, this.elementPerPage)},
					() => {this.maxPage = Math.floor(this.state.allIds.length / this.elementPerPage)}
				); //gérer le cas ou il y a moins de 8 créations
			})
			.catch(error => console.error(error));
	}
	
	next()
	{
		this.page++;
		this.page === this.maxPage ? this.navigationVisibility.next = false : this.navigationVisibility.next = true;
		this.navigationVisibility.prev = true;
		this.setState((prevState) => {
			return {visibleIds: prevState.allIds.slice(this.page * this.elementPerPage, (this.page + 1) * this.elementPerPage)}
		});
	}

	prev()
	{
		this.page--;
		this.page === 0 ? this.navigationVisibility.prev = false : this.navigationVisibility.prev = true
		this.navigationVisibility.next = true;
		this.setState((prevState) => {
			return {visibleIds: prevState.allIds.slice(this.page * this.elementPerPage, (this.page + 1) * this.elementPerPage)}
		});
	}

	render() {
		const gridsJSX = this.state.visibleIds.map( item =>
			<ArtworkElement key={item.id} id={item.id} />
		);
		const menuJSX = this.menu.map(item =>
			<li key={item} onClick={() => this.handleNav(item)}>{item}</li>
		);
		return (
			<div>
				<nav>
					<ul>
						{menuJSX}
					</ul>
				</nav>
				<main>
					{gridsJSX}
				</main>
				<ArtworksNav next={this.next} prev={this.prev} visibility={this.navigationVisibility}/>
			</div>
		);
	}
}

export default Artworks
