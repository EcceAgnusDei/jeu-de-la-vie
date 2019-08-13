import React from 'react'

function Footer(props) {

	function delAccount()
	{
		if(window.confirm("Êtes-vous sur de vouloir supprimer votre compte ?"))
		{
			fetch(`http://localhost/GolApi/delAccount.php?id=${props.userId}`)
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
			&copy; Antoine Mondoloni <a href="#">RGPD</a> <a href="#">Mentions légales</a>
			{props.userId !== 0 && <button onClick={delAccount}>Supprimer votre compte</button>}
		</footer>
	);
}

export default Footer