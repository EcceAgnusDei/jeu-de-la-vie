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
				});
		}
	}

	return (
		<footer>
			<a>&copy; Antoine Mondoloni</a> <a href="http://mondoloni-dev.fr/legal/rgpd.html">RGPD</a>
			<a href="http://mondoloni-dev.fr/legal/legalNotice.html">Mentions légales</a>
			{props.userId !== 0 && <button onClick={delAccount}>Supprimer votre compte</button>}
		</footer>
	);
}

export default Footer