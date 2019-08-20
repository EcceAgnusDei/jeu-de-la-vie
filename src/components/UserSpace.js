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
		const menuJSX = this.menu.map(item => {return <li key={item}><button className="menu-btn" onClick={() => this.handleNav(item)}>{item}</button></li>});
		return (
			<React.Fragment>
				<nav>
					<ul className="menu">
						{menuJSX}
						<button className="danger-btn" onClick={this.props.logout}>Déconnexion</button>
					</ul>
				</nav>
				{this.state.activePage === this.menu[0] && <Artworks userSpace={true} userId={this.props.userId}/>}
				{this.state.activePage === this.menu[1] && <Comments userSpace={true} userId={this.props.userId}/>}
			</React.Fragment>
		);
	}
}

export default UserSpace
