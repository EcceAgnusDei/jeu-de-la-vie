import React from 'react';
import Navbar from './Navbar';
import logo from '../img/logo.png';
import LogForm from './LogForm';

function Header(props) {
	return (
		<header>
			<img className="logo" src={logo}/>
			<button className="burger-btn" onClick={props.burgerClick}>
				<div className="burger-bar" />
				<div className="burger-bar" />
				<div className="burger-bar" />
			</button>
			{props.navbar}
			{!props.loggedId && <LogForm log={props.log}/>}
		</header>
	);
}

export default Header