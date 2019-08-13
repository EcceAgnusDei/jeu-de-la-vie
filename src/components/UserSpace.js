import React, { Component } from 'react';
import Artworks from './Artworks'
import Comments from './Comments'

class UserSpace extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activePage: 'Vos créations'
		};

		this.menu = ['Vos créations', 'Vos commentaires']
	}
	
	handleNav(link) {
		this.setState({activePage: link});
	}

	render() {
		const menuJSX = this.menu.map(item => {return <li key={item} onClick={() => this.handleNav(item)}>{item}</li>});
		return (
			<div>
				<nav>
					<ul>
						{menuJSX}
					</ul>
				</nav>
				<button onClick={this.props.logout}>Déconnexion</button>
				{this.state.activePage === this.menu[0] && <Artworks userSpace={true} userId={this.props.userId}/>}
				{this.state.activePage === this.menu[1] && <Comments userSpace={true} userId={this.props.userId}/>}
			</div>
		);
	}
}

export default UserSpace
