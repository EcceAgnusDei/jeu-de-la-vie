import React, { useState } from 'react';
import Artworks from './Artworks'
import Comments from './Comments'

function UserSpace(props) {

	const menu = ['Vos créations', 'Vos commentaires'];
	const [activePage, setActivePage] = useState('Vos créations')

	function handleNav(link) {
		setActivePage(link);
	}

	const menuJSX = menu.map(item => {return <li key={item}><button className="menu-btn" onClick={() => handleNav(item)}>{item}</button></li>});
	if (props.userId === 0)
	{
		throw new Error('Veuillez vous connecter pour accéder à cette page');
	}
	return (
		<main>
			<nav>
				<ul className="menu">
					{menuJSX}
					<button className="danger-btn" onClick={props.logout}>Déconnexion</button>
				</ul>
			</nav>
			{activePage === menu[0] && <Artworks userSpace={true} userId={props.userId}/>}
			{activePage === menu[1] && <Comments userSpace={true} userId={props.userId}/>}
		</main>
	);
}

export default UserSpace