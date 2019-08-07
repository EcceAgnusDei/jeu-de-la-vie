import React from 'react'
import { NavConsumer } from '../context/navContext'

function Navbar(props) {
	return (
		<ul>
			<NavConsumer>
				{
					(value) => {
						return value.menu.map(item => <li onClick={() => value.nav(item)}>{item}</li>)
					}
				}
			</NavConsumer>
		</ul>
	);
}

export default Navbar