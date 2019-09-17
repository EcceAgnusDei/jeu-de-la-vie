import React, { Component } from 'react';

import useInput from '../hooks/useInput';

function ContactForm(props) {
	const [message, bindMessage, setMessage] = useInput('');

	const handlesubmit = (e) => {
		e.preventDefault();
		fetch(`https://jeu-de-la-vie.mondoloni-dev.fr/golApi/contactMail.php`,
		{
			method: 'post',
			body: JSON.stringify([props.userId, message])
		})
		.then(() => {
			alert('Message envoyé');
			setMessage('');
		});
	}

	return (
		<form className="contact-form" onSubmit={handlesubmit}>
			<textarea {...bindMessage} aria-label="Votre message" placeholder="Votre message" required/>
			<button className="btn">Envoyer</button>
		</form>
	);
}

export default ContactForm
