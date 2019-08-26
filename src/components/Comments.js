import React, { Component } from 'react';
import CommentForm from './CommentForm';
import apiPath from '../apiPath';

class Comments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: []
		};

		this.getComments = this.getComments.bind(this);
		this.addComment = this.addComment.bind(this);
	}

	componentDidMount()
	{
		this.getComments();
	}

	getComments()
	{
		if(this.props.userSpace) {
			fetch(`${apiPath}getUserComments.php`, {
				method: 'POST',
				body: this.props.userId
			})
			.then(response => response.json())
			.then(json => {
				console.log(json);
				this.setState({comments: json})
			})
			.catch(() => {throw new Error('Impossible de se connecter à la base de données')});
		} else {
			fetch(`${apiPath}getGridComments.php`, {
				method: 'post',
				body: JSON.stringify([this.props.gridId, this.props.userId])
			})
			.then(response => response.json())
			.then(json => {
				console.log(json);
				this.setState({comments: json})
			})
		}
	}

	addComment(comment)
	{
		fetch(`${apiPath}addComment.php`, {
			method: 'POST',
			body: JSON.stringify([this.props.gridId, this.props.userId, comment])
		})
			.then(response => response.json())
			.then(json => {
				if(json === true) {
					this.getComments();
				} else {
					alert('erreur');
				}
			})
	}

	likeComment(commentId)
	{
		fetch(`${apiPath}likeComment.php`, {
			method: 'post',
			body: JSON.stringify([commentId, this.props.userId])
		})
			.then(response => response.json())
			.then(json => {
				json ? this.getComments() : alert('Erreur');
			})
	}

	dislikeComment(commentId)
	{
		fetch(`${apiPath}dislikeComment.php`, {
			method: 'post',
			body: JSON.stringify([commentId, this.props.userId])
		})
			.then(response => response.json())
			.then(json => {
				json ? this.getComments() : alert('Erreur');
			})
	}

	deleteComment(id)
	{
		if(window.confirm('Voulez-vous supprimer votre commentaire ?'))
		{
			fetch(`${apiPath}deleteComment.php`, {
				method: 'post',
				body: id
			})
			.then(response=> response.json())
			.then(json => {
				json ? this.getComments() : alert('erreur');
			})
		}
	}
	
	render() {
		const commentsJSX = this.state.comments.map(
			item => 
			<div key={item.id} className="comment">
				<div><strong>{!this.props.userSpace && item.author}</strong> le {item.date}</div>
				<p>{item.comment}</p>
				<div className="comment_action-container">
					<div className="like-container">
						<div className={item.likeState === 'liked' ? 'blue' : ''}>
							{this.props.userId != 0 ?
							<button 
								title={item.likeState === 'liked' ? 'Je n\'aime plus' : 'J\'aime'}
								onClick={() => this.likeComment(item.id)}
								className="like-btn"
							>
								<i className="far fa-thumbs-up"></i>
							</button> :
							<i className="far fa-thumbs-up"></i>}
							{item.nbLikes}
						</div>
						<div className={item.likeState === 'disliked' ? 'red' : ''}>
							{this.props.userId != 0 ?
							<button
								title={item.likeState === 'disliked' ? 'Pas si mal finalement...' : 'Je n\'aime pas!'}
								onClick={() => this.dislikeComment(item.id)}
								className="like-btn"
							><i className="far fa-thumbs-down"></i>
							</button> :
							<i className="far fa-thumbs-down"></i>}
							{item.nbDislikes}
						</div>
					</div>
					{(item.authorId === this.props.userId || this.props.userSpace) &&
					<button 
						className="danger-btn" 
						onClick={() => this.deleteComment(item.id)}
					>
						Supprimer
					</button>}
				</div>
			</div>
		);
		return (
			<section className="comment-container">
				{(this.props.userId != 0 && this.props.gridId) && <CommentForm addComment={this.addComment} userId={this.props.userId}/>}
				{commentsJSX}
			</section>
		);
	}
}

export default Comments
