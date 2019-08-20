import React from 'react';
import Navbar from './Navbar';
import logo from '../img/logo.png';
import LogForm from './LogForm';

function Header(props) {
	return (
		<header>
			<img className="logo" src={logo}/>
			<Navbar menu={props.menu}/>
			{!props.loggedId && <LogForm log={props.log}/>}
		</header>
	);
}

export default Header