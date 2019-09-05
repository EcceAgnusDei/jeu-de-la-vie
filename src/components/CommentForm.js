import React from 'react';
import useInput from '../hooks/useInput';

function CommentForm(props) {

	const[comment, bindComment, resetComment] = useInput('');

	function handleSubmit(event) {
		event.preventDefault();
		props.addComment(comment);
		resetComment();
	}

	return (
		<div>
			<h2>Laissez un commentaire</h2>
			<form className="comment-form" onSubmit={handleSubmit}>
				<textarea name="comment" {...bindComment}/>
				<button className="btn">Envoyer</button>
			</form>
		</div>
	);
}

export default CommentForm