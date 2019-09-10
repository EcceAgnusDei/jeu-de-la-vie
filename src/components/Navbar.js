import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar(props) {
	return (
		<nav>
			<ul className="menu">
				<li>
					<NavLink 
						className="menu-btn"
						exact 
						activeClassName="currentPage" 
						to="/"
					>
						Accueil
					</NavLink>
					<NavLink 
						className="menu-btn" 
						activeClassName="currentPage" 
						to="/jouer"
					>
						Jouer
					</NavLink>
					<NavLink 
						className="menu-btn" 
						activeClassName="currentPage" 
						to="/creations"
					>
						Créations
					</NavLink>
					{props.loggedId === 0 ?
					<NavLink 
						className="menu-btn" 
						activeClassName="currentPage" 
						to="/inscription"
					>
						Inscription
					</NavLink> :
					<NavLink 
						className="menu-btn" 
						activeClassName="currentPage" 
						to="/espace-perso"
					>
						Espace perso
					</NavLink>}
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;