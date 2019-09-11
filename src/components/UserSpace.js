import React, { useState } from 'react';
import { Route, NavLink } from 'react-router-dom';

import Artworks from './Artworks';
import Comments from './Comments';
import Navbar from './Navbar';
import Home from './Home';

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
		<React.Fragment>
			<Navbar>
				<NavLink 
					className="menu-btn" 
					to="/espace-perso/mes-creations"
				>
					Vos créations
				</NavLink>
				<NavLink 
					className="menu-btn" 
					to="/espace-perso/mes-commentaires"
				>
					Vos commentaires
				</NavLink>
				<button className="danger-btn" onClick={props.logout}>Déconnexion</button>
			</Navbar>
			<Route exact path="/espace-perso" render={(p) => 
				<Artworks {...p} userSpace={true} userId={props.userId}/>
			}/>
			<Route path="/espace-perso/mes-creations" render={(p) => 
				<Artworks {...p} userSpace={true} userId={props.userId}/>
			}/>
			<Route path="/espace-perso/mes-commentaires" render={(p) => 
				<Comments {...p} userSpace={true} userId={props.userId}/>
			}/>
		</React.Fragment>
	);
}

export default UserSpace