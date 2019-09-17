import React, { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import apiPath from '../apiPath';
import ErrorBoundary from './ErrorBoundary'; 

function Comments(props) {
	const [comments, setComments] = useState([]);
	const [hasDbError, setHasDbError] = useState(false);
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		getComments();
	}, [props.gridId]);

	function getComments()
	{
		if(props.userSpace) {
			fetch(`${apiPath}getUserComments.php`, {
				method: 'POST',
				body: props.userId
			})
			.then(response => response.json())
			.then(json => {
				setComments(json);
				setLoading(false);
			})
			.catch(() => { setDataBaseError() });
		} else if (props.admin) {
			fetch(`${apiPath}adminGetAllComments.php`)
			.then(response => response.json())
			.then(json => {
				setComments(json);
				setLoading(false);
			})
			.catch(() => { setDataBaseError() });
		}
		else {
			fetch(`${apiPath}getGridComments.php`, {
				method: 'post',
				body: JSON.stringify([props.gridId, props.userId])
			})
			.then(response => response.json())
			.then(json => {
				setComments(json);
				setLoading(false);
			})
			.catch(() => { setDataBaseError() });
		}
	}

	function setDataBaseError()
	{
		console.log('dberror')
		setHasDbError(true);
		setLoading(false);
	}

	function addComment(comment)
	{
		fetch(`${apiPath}addComment.php`, {
			method: 'POST',
			body: JSON.stringify([props.gridId, props.userId, comment])
		})
			.then(response => response.json())
			.then(json => {
				if(json === true) {
					getComments();
				} else {
					setDataBaseError();
				}
			})
			.catch(() => { setDataBaseError() })
	}

	function likeComment(commentId)
	{
		fetch(`${apiPath}likeComment.php`, {
			method: 'post',
			body: JSON.stringify([commentId, props.userId])
		})
			.then(response => response.json())
			.then(json => {
				json ? getComments() : setDataBaseError();
			})
			.catch(() => { setDataBaseError() })
	}

	function dislikeComment(commentId)
	{
		fetch(`${apiPath}dislikeComment.php`, {
			method: 'post',
			body: JSON.stringify([commentId, props.userId])
		})
			.then(response => response.json())
			.then(json => {
				json ? getComments() : setDataBaseError();
			})
			.catch(() => { setDataBaseError() })
	}

	function deleteComment(id)
	{
		if(window.confirm('Voulez-vous supprimer votre commentaire ?'))
		{
			fetch(`${apiPath}deleteComment.php`, {
				method: 'post',
				body: id
			})
			.then(response=> response.json())
			.then(json => {
				json ? getComments() : setDataBaseError();
			})
			.catch(() => { setDataBaseError() })
		}
	}

	if (hasDbError) 
	{
		throw new Error('Erreur lors de la connexion à la base de données');
	}

	const commentsJSX = comments.map(
		item => 
		<div key={item.id} className="comment">
			<div><strong>{!props.userSpace && item.author}</strong> le {item.date}</div>
			<p>{item.comment}</p>
			<div className="comment_action-container">
				<div className="like-container">
					<div className={item.likeState === 'liked' ? 'blue' : ''}>
						{props.userId != 0 ?
						<button 
							title={item.likeState === 'liked' ? 'Je n\'aime plus' : 'J\'aime'}
							onClick={() => likeComment(item.id)}
							className="like-btn"
						>
							<i className="far fa-thumbs-up"></i>
						</button> :
						<i className="far fa-thumbs-up"></i>}
						{item.nbLikes}
					</div>
					<div className={item.likeState === 'disliked' ? 'red' : ''}>
						{props.userId != 0 ?
						<button
							title={item.likeState === 'disliked' ? 'Pas si mal finalement...' : 'Je n\'aime pas!'}
							onClick={() => dislikeComment(item.id)}
							className="like-btn"
						><i className="far fa-thumbs-down"></i>
						</button> :
						<i className="far fa-thumbs-down"></i>}
						{item.nbDislikes}
					</div>
				</div>
				{(item.authorId === props.userId || props.userSpace) &&
				<button 
					className="danger-btn" 
					onClick={() => deleteComment(item.id)}
				>
					Supprimer
				</button>}
			</div>
		</div>
	);
	return (
		<section className="comment-container">
			{(props.userId != 0 && props.gridId) && 
			<CommentForm addComment={addComment} userId={props.userId}/>}
			{!props.gridId && comments.length === 0 && !loading &&
			<h4>Vous n'avez pas publié de commentaires</h4>}
			{loading && 
			<div className="artworks"><div className="loading"><i className="fas fa-spinner"></i></div></div>}
			{commentsJSX}
		</section>
	);
}

function ErrorBoundedComments(props) {
	return (
		<ErrorBoundary>
			<Comments {...props} />
		</ErrorBoundary>
	);
}

export default ErrorBoundedComments;

