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
		setChecked(checked);
		fetch(`${apiPath}switchVisibility.php`, {
			method: 'POST',
			body: props.id
		})
	};

	return (
		<div className="switch_visibility-container" style={style}>
			<span>Publier</span>
			<Switch 
				onChange={handleChange} 
				checked={checked} 
			/>
		</div>
	);
}

export default SwitchVisibility;
