import React, { useState } from 'react';

function Command(props) {
	const [play, setPlay] = useState(false);
	const [rubber, setRubber] = useState(false);

	function handleClick(event)
	{	
		if (event.target.name === 'play' || event.target.name === 'pause') 
			setPlay(prevState => !prevState);
		else if (event.target.name === 'rubber') 
			setRubber(prevState => !prevState);

		props.handleCommand(event.target.name);
	}

	const playJSX = play ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>;
	const rubberJSX = rubber ? <i className="fas fa-pencil-alt"></i> : <i className="fas fa-eraser"></i>;
	return (
		<div className="command">
			<div className="command-item">
				<button className="command-btn" name={play ? 'pause' : 'play'} onClick={handleClick}>
					{playJSX}
				</button>
				<button className="command-btn" name="next" onClick={handleClick}>
					<i className="fas fa-step-forward"></i>
				</button>
				<button className="command-btn" name="rubber" onClick={handleClick}>
					{rubberJSX}
				</button>
			</div>
			<div className="command-item">
				<button className="command-btn" name="save" onClick={handleClick}>Enregistrer</button>
				<button className="command-btn" name="load" onClick={handleClick}>Charger</button>
			</div>
		</div>
	);
}

export default Command
