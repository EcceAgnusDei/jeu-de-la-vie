import React from 'react'
import step1 from '../img/step1.png'
import step2 from '../img/step2.png'

function Home(props) {
	return (
		<React.Fragment>
			<h1>Bienvenue sur le site du jeu de la vie !</h1>
			<p>
				Ce site est dédié aux curieux avides de satisfaire leur esprit ingénieux et 
				créatifs en concevant des automates cellulaires de <strong>John Conway</strong>
				. Pour cela rien de plus simple, il vous suffit de cliquer sur <span tabindex="0" class="link" onClick={() => props.handleNav('Jouer')}>
				Jouer</span> !
			</p>
			<h2>Inscrivez-vous pour pouvoir sauvegarder vos chefs-d'oeuvre.</h2>
			<p>Vous pourrez également partager vos créations avec les autres utilisateurs, les commenter et les liker !</p>
			<p>Vous trouverez même un classement des créations les plus appréciées dans la rubrique <em>Les créations</em>
			. Il ne vous reste plus qu'à redoubler d'ingéniosité pour créer la population de cellules la plus ludique.</p>
			<h2>Comment cela fonctionne ?</h2>
			<div>
				<img src={step1} alt=""/>
				<div><i className="fas fa-long-arrow-alt-right"></i></div>
				<img src={step2} alt=""/>
			</div>
			<p>Cliquer sur différents carrés de la grille pour faire apparaître des cellules. Si celles-ci ont plus de 3 voisins elles mourront de surpopulation, si elles ont moins de 2 voisins, c'est l'isolement qui les exterminera. Il vous suffit de cliquer sur suivant pour avancer d'une génération, ou sur le bouton play pour lancer l'animation. Le but du jeu ici est de créer une colonie de cellules proposant un évolution ludique, bref qui donne vie à votre écran !<strong> N'oubliez pas de sauvegarder votre création avant de passer à la génération suivant, ou l'état initial sera perdu !</strong></p>
			<p><strong>A vous de jouer !</strong></p>
		</React.Fragment>
	);
}

export default Home