import React from 'react'
import { NavConsumer } from '../context/navContext'

function Navbar(props) {
	let className;
	return (
		<nav>
			<ul className="menu">
				<NavConsumer>
				{
					(value) => {
						return value.menu.map(item => {
							if(props.active === item)
							{
								className = 'menu-btn current_page';
							} else {
								className = 'menu-btn';
							}
							return  <li key={item}>
									<button className={className} onClick={() => value.nav(item)}>{item}</button>
								</li>
						})
					}
				}
				</NavConsumer>
			</ul>
		</nav>
	);
}

export default Navbar