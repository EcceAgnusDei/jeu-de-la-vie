import React, { Component } from 'react';
import ArtworksNav from './ArtworksNav';
import ArtworkElement from './ArtworkElement';
import ErrorBoundary from './ErrorBoundary';
import apiPath from '../apiPath';

class Artworks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allIds: [],
			visibleIds: [],
			hasDbError: false,
			loading: true,
			maxPage: 0
		};

		this.page = 0;
		this.elementPerPage = 8;
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
		this.setState({loading: true})
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

				this.setState({
					allIds: json, 
					visibleIds: json.slice(0, this.elementPerPage),
					loading: false,
					maxPage: Math.floor(json.length / this.elementPerPage)
					}
				); //gérer le cas ou il y a moins de 8 créations
			})
			.catch(() => this.setState({hasDbError: true}));
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
			})
			.catch(() => this.setState({hasDbError: true}));
		}
	}
	
	next()
	{
		this.page++;;
		this.setState((prevState) => {
			return {visibleIds: prevState.allIds.slice(this.page * this.elementPerPage, (this.page + 1) * this.elementPerPage)}
		});
	}

	prev()
	{
		this.page--;
		this.setState((prevState) => {
			return {visibleIds: prevState.allIds.slice(this.page * this.elementPerPage, (this.page + 1) * this.elementPerPage)}
		});
	}

	render() {
		const gridsJSX = this.state.visibleIds.map( item => 
				<ArtworkElement deleteGrid={this.deleteGrid} key={item.id} id={item.id} userSpace={this.props.userSpace} elementPerPage={this.elementPerPage} />
		);
		const menuJSX = this.menu.map(item =>
			<li key={item}><button className="menu-btn" onClick={() => this.handleNav(item)}>{item} {<i className="fas fa-sort-down"></i>}</button></li>
		);
		if (this.state.hasDbError)
		{
			throw new Error('Impossible de se connecter à la base de données');
		}
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
				{
					this.state.loading ? 
					<div className="loading"><i className="fas fa-spinner"></i></div> :
					<React.Fragment>{gridsJSX}</React.Fragment>
				}
				</div>
				<ArtworksNav next={this.next} prev={this.prev} currentPage={this.page} maxPage={this.state.maxPage}/>
			</React.Fragment>
		);
	}
}

export default Artworks
