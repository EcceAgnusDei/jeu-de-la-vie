import React, { Component } from 'react';

class UserSpace extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}
	
	render() {
		return (
			<div>
				<button onClick={this.props.logout}>Déconnexion</button>
			</div>
		);
	}
}

export default UserSpace
