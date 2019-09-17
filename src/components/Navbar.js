import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar(props) {
	return (
		<nav>
			<ul className="menu">
				{props.children.map(item => 
					<li key={item.props.children}>{item}</li>
				)}
			</ul>
		</nav>
	);
}

export default Navbar;