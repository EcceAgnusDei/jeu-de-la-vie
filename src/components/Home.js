import React, { useEffect } from 'react'
import step1 from '../img/step1.png'
import step2 from '../img/step2.png'

function Home(props) {

	useEffect(() => {
		const arrow = document.getElementById('show_steps-arrow');
		if (window.matchMedia("(max-width: 540px)").matches)
		{
			arrow.innerHTML ='<i class="fas fa-long-arrow-alt-down"></i>';

		}
		else if (window.matchMedia("(min-width: 541px)").matches)
		{
			arrow.innerHTML = '<i class="fas fa-long-arrow-alt-right"></i>';
		}
	}, [])
	return (
		<main className="grid">
			<h1>Bienvenue sur le site du jeu de la vie !</h1>
			<p>
				Ce site est dédié aux curieux avides de satisfaire leur esprit ingénieux et 
				créatifs en concevant des automates cellulaires de <strong><a target="_blank" href="https://fr.wikipedia.org/wiki/Jeu_de_la_vie">John Conway</a></strong>
				. Pour cela rien de plus simple, il vous suffit de cliquer sur <span tabIndex="0" className="link" onClick={() => props.history.push('/jouer')}>
				Jouer</span> !
			</p>
			<h2>Inscrivez-vous pour pouvoir sauvegarder vos chefs-d'oeuvre.</h2>
			<p>Vous pourrez également partager vos créations avec les autres utilisateurs, les commenter et les liker !</p>
			<p>Vous trouverez même un classement des créations les plus appréciées dans la rubrique <span tabIndex="0" className="link" onClick={() => props.history.push('/creations')}>
			Les créations</span>. Il ne vous reste plus qu'à redoubler d'ingéniosité pour créer la population de cellules la plus ludique.</p>
			<h2>Comment cela fonctionne ?</h2>
			<div className="show_steps">
				<img src={step1} alt=""/>
				<div id="show_steps-arrow"><i className="fas fa-long-arrow-alt-right"></i></div>
				<img src={step2} alt=""/>
			</div>
			<p>Cliquer sur différents carrés de la grille pour faire apparaître des cellules. Si celles-ci ont plus de 3 voisins elles mourront de surpopulation, si elles ont moins de 2 voisins, c'est l'isolement qui les exterminera. Il vous suffit de cliquer sur suivant pour avancer d'une génération, ou sur le bouton play pour lancer l'animation. Le but du jeu ici est de créer une colonie de cellules proposant un évolution ludique, bref qui donne vie à votre écran !<strong> N'oubliez pas de sauvegarder votre création avant de passer à la génération suivant, ou l'état initial sera perdu !</strong></p>
			<p><strong>A vous de jouer !</strong></p>
		</main>
	);
}

export default Home;
