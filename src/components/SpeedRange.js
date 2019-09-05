import React, { useState, useEffect } from 'react';

function SpeedRange(props) {
	const [speed, setSpeed] = useState('1');

	useEffect(() => props.handleSpeed(parseFloat(speed)));

	function handleChange(event) {
		setSpeed(event.target.value);
	}

	return (
		<label className="speed_range">Vitesse
			<input 
				type="range" 
				name="speed" 
				min="0.5" 
				max="50" 
				value={speed}
				onChange={handleChange}
			/>
		</label>
	);
}

export default SpeedRange
