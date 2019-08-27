import React from 'react';
import { NavConsumer } from '../context/navContext';

function Navbar(props) {
	console.log(props);
	let className;
	return (
		<nav>
			<ul className="menu">
			{
				props.menu.map(item => {
					if(props.active === item)
					{
						className = 'menu-btn current_page';
					} else {
						className = 'menu-btn';
					}
					return  (
						<li key={item}>
							<button className={className} onClick={() => props.nav(item)}>{item}</button>
						</li>
					);
				})
			}
			</ul>
		</nav>
	);
}

export default Navbar