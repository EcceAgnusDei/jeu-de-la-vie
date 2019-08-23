import React, { Component } from 'react';
import ArtworksNav from './ArtworksNav';
import ArtworkElement from './ArtworkElement';
import apiPath from '../apiPath';

class Artworks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allIds: [],
			visibleIds: []
		};

		this.page = 0;
		this.elementPerPage = 8;
		this.rows = 2;
		this.navigationVisibility = {next: true, prev: false}
		this.maxPage = 0;
		this.menu = ['Les dernières création', 'Les plus populaires'];
		this.sort = 'date'

		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
		this.sortByLikes = this.sortByLikes.bind(this);
		this.sortByDate = this.sortByDate.bind(this);
		this.handleNav = this.handleNav.bind(this);
		this.deleteGrid = this.deleteGrid.bind(this);
		this.getIds = this.getIds.bind(this);
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

		this.sort = 'likes'
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

		this.sort = 'date';
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
		this.getIds();
	}

	getIds()
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

		fetch(`${apiPath}${API}.php`, init)
			.then(response => response.json())
			.then(json => {

				this.setState({allIds: json, visibleIds: json.slice(0, this.elementPerPage)},
					() => {this.maxPage = Math.floor(this.state.allIds.length / this.elementPerPage)}
				); //gérer le cas ou il y a moins de 8 créations
			})
			.catch(error => console.error(error));
	}

	deleteGrid(id)
	{	
		if(window.confirm('Voulez-vous supprimer votre création ?'))
		{
			fetch(`${apiPath}deleteGrid.php`, {
	      		method: 'post',
	      		body: id
	    	})
			.then(response => response.json())
			.then(json => {
				json ? this.getIds() : alert('erreur');
			});
		}
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
			<ArtworkElement deleteGrid={this.deleteGrid} key={item.id} id={item.id} userSpace={this.props.userSpace} elementPerPage={this.elementPerPage} rows={this.rows}/>
		);
		const menuJSX = this.menu.map(item =>
			<li key={item}><button className="menu-btn" onClick={() => this.handleNav(item)}>{item} {<i className="fas fa-sort-down"></i>}</button></li>
		);
		return (
			<React.Fragment>
				<nav>
					<ul className="artworks-menu">
						<li>
							<button 
								className="menu-btn" 
								onClick={() => this.handleNav(this.menu[0])}
							>
							{this.menu[0]} {this.sort === 'date' && <i className="fas fa-sort-down"></i>}
							</button>
						</li>
						<li>
							<button 
								className="menu-btn" 
								onClick={() => this.handleNav(this.menu[1])}
							>
							{this.menu[1]} {this.sort === 'likes' && <i className="fas fa-sort-down"></i>}
							</button>
						</li>
					</ul>
				</nav>
				<div className="artworks">
					{gridsJSX}
				</div>
				<ArtworksNav next={this.next} prev={this.prev} visibility={this.navigationVisibility}/>
			</React.Fragment>
		);
	}
}

export default Artworks
