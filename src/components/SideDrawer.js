import React from 'react';
import Navbar from './Navbar';
import LogForm from './LogForm';

function SideDrawer(props) {
	let className = 'backdrop';

	if(props.open)
	{
		className = 'backdrop open'
	}
	return (
		<div className={className} onClick={props.backdropClick}>
			<div className="side_drawer">
				<Navbar />
			</div>
		</div>
	);
}

export default SideDrawer;