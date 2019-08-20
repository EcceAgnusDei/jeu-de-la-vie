import React from 'react'
import { NavConsumer } from '../context/navContext'

function Navbar(props) {
	return (
		<nav>
			<ul className="menu">
				<NavConsumer>
				{
					(value) => {
						return value.menu.map(item => <li key={item}><button className="menu-btn" onClick={() => value.nav(item)}>{item}</button></li>)
					}
				}
				</NavConsumer>
			</ul>
		</nav>
	);
}

export default Navbar