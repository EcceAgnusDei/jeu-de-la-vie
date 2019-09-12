import React from 'react';
import ContactForm from './ContactForm';

function Contact(props) {
	if (!props.userId)
	{
		throw new Error(`Vous ne pouvez pas accéder à cette page`);
	}
	return (
		<React.Fragment>
			<h2>Ce site est en évolution, contactez-moi si vous avez des suggestions !</h2>
			<ContactForm userId={props.userId}/>
		</React.Fragment>
	);
}

export default Contact