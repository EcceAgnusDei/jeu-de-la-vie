import React from 'react'
import Navbar from './Navbar'
import logo from '../img/logo.png'

function Header(props) {
	return (
		<header>
			<img src={logo}/>
			<Navbar menu={props.menu}/>
		</header>
	);
}

export default Header