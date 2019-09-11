import React, { useState } from 'react';
import Switch from "react-switch";
import apiPath from '../apiPath';

function SwitchVisibility(props) {

	const [checked, setChecked] = useState(props.checked == 1 ? true : false)
	const style = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: 130
	};

	const handleChange = (checked) => {
		let API;
		setChecked(prev => !prev);
		if (props.admin) {
			API = 'adminSwitchVisibility'
		} else {
			API = 'switchVisibility'
		}
		fetch(`${apiPath}${API}.php`, {
			method: 'POST',
			body: props.id
		})
	};

	return (
		<div className="switch_visibility-container" style={style}>
			<span>{props.span}</span>
			<Switch 
				onChange={handleChange} 
				checked={props.invert ? !checked : checked} 
			/>
		</div>
	);
}

export default SwitchVisibility;
