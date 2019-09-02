import React from 'react';
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
						alert('Erreur');
					}
				})
		}
	}

	return (
		<footer>
			<div className="footer-container">
				{props.userId !== 0 && <button onClick={delAccount}>Supprimer votre compte</button>}
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

export default Footer