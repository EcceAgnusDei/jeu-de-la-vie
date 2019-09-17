import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import Comments from './Comments';
import Artworks from './Artworks';

function Admin(props) {
	if (props.userId != 1) {
		throw new Error(`Seul l'administrateur peut accéder à cette partie du site!`);
	}
	return (
		<React.Fragment>
			<h1>Admin</h1>
			<Navbar>
				<NavLink to="/admin/creations" className="menu-btn">
					Les créations
				</NavLink>
				<NavLink to="/admin/commentaires" className="menu-btn">
					Les commentaires
				</NavLink>
			</Navbar>
			<Route exact path="/admin" render={(props) => 
				<Artworks admin/>
			}/>
			<Route path="/admin/commentaires" render={(props) => 
				<Comments admin/>
			}/>
			<Route path="/admin/creations" render={(props) => 
				<Artworks admin/>
			}/>
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		userId: state.user
	}
}

export default connect(mapStateToProps, null)(Admin);