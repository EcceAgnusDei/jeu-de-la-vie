import React from 'react';
import { withRouter } from 'react-router-dom'

import apiPath from '../apiPath';

function Footer(props) {

	function delAccount()
	{
		if(window.confirm("Êtes-vous sur de vouloir supprimer votre compte ?"))
		{
			fetch(`${apiPath}delAccount.php`, {
			method: 'post',
			body: JSON.stringify(props.userId)
		})
				.then(response => response.json())
				.then(json => {
					if(json) {
						props.logout();
						alert('Compte supprimé');
					} else {
						alert('Une erreur est survenue');
					}
				})
		}
	}

	return (
		<footer>
			<div className="footer-container">
				{props.userId > 1 && <button onClick={delAccount}>Supprimer votre compte</button>}
				{props.userId == 1 && <button onClick={() => props.history.push('/admin')}>Admin</button>}
				<div className="bottom">
					<a target="_blank" href="http://mondoloni-dev.fr">&copy; Antoine Mondoloni </a> 
					<div className="legal">
						<a target="_blank" href="http://mondoloni-dev.fr/legal/rgpd.html">RGPD </a>
						<a target="_blank" href="http://mondoloni-dev.fr/legal/legalNotice.html">Mentions légales</a>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default withRouter(Footer)