import React, { Component } from 'react';
import Switch from "react-switch";
import apiPath from '../apiPath';


class SwitchVisibility extends Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: props.checked
		};
		this.style = {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			width: 130
		};
	}

	handleChange = (checked) => {
		this.setState({checked: checked})
		fetch(`${apiPath}switchVisibility.php`, {
			method: 'POST',
			body: this.props.id
		})
	};
	
	render() {
		return (
			<div className="switch_visibility-container" style={this.style}>
				<span>Publier</span>
				<Switch 
					onChange={this.handleChange} 
					checked={this.state.checked} 
				/>
			</div>
		);
	}
}

export default SwitchVisibility;
