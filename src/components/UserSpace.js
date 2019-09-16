import React, { useState } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux'

import Artworks from './Artworks';
import Comments from './Comments';
import Navbar from './Navbar';
import Home from './Home';
import { LOGOUT } from '../actions/types'

function UserSpace(props) {

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
				<button className="danger-btn" onClick={() => {
						props.history.push('/');
						props.logout(); 
					}
				}>
					Déconnexion
				</button>
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

const mapDispacthToProps = (dispatch) => {
	return {
		logout: () => dispatch({type: LOGOUT})
	}
}

const mapStateToProps = state => {
  return {
    userId: state.user
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(UserSpace);