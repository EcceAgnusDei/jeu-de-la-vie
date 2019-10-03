import React from 'react';
import { connect } from 'react-redux';

import ContactForm from './ContactForm';

function Contact(props) {
	document.title = "Me contacter";
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

const mapStateToProps = (state) => {
	return {
		userId: state.user
	}
}

export default connect(mapStateToProps, null)(Contact);