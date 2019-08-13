import React, { Component } from 'react';
import CommentForm from './CommentForm'

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
			fetch('http://localhost/GolApi/getUserComments.php', {
				method: 'POST',
				body: this.props.userId
			})
			.then(response => response.json())
			.then(json => {
				console.log(json);
				this.setState({comments: json})
			});
		} else {
			fetch(`http://localhost/GolApi/getGridComments.php?gridId=${this.props.gridId}&currentUserId=${this.props.userId}`)
			.then(response => response.json())
			.then(json => {
				this.setState({comments: json})
			});
		}
	}

	addComment(comment)
	{
		fetch(`http://localhost/GolApi/addComment.php`, {
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
			});	
	}

	likeComment(commentId)
	{
		fetch(`http://localhost/GolApi/likeComment.php?commentId=${commentId}&userId=${this.props.userId}`)
			.then(response => response.json())
			.then(json => {
				json ? this.getComments() : alert('Erreur');
			});
	}

	dislikeComment(commentId)
	{
		fetch(`http://localhost/GolApi/dislikeComment.php?commentId=${commentId}&userId=${this.props.userId}`)
			.then(response => response.json())
			.then(json => {
				json ? this.getComments() : alert('Erreur');
			});
	}
	
	render() {
		const commentsJSX = this.state.comments.map(
			item => 
			<div key={item.id}>
				<p>{!this.props.userSpace && item.author} le {item.date}</p>
				<p>{item.comment}</p>
				<div>
					{this.props.userId != 0 ?
					<button 
						title={item.likeState === 'liked' ? 'Je n\'aime plus' : 'J\'aime'}
						onClick={() => this.likeComment(item.id)}
					>like
					</button> :
					' likes '}
					{item.nbLikes}
					{this.props.userId != 0 ?
					<button
						title={item.likeState === 'disliked' ? 'Pas si mal finalement...' : 'Je n\'aime pas!'}
						onClick={() => this.dislikeComment(item.id)}
					>dislike
					</button> :
					' dislikes '}
					{item.nbDislikes}
				</div>
			</div>
		);
		return (
			<section>
				{(this.props.userId != 0 && this.props.gridId) && <CommentForm addComment={this.addComment} userId={this.props.userId}/>}
				{commentsJSX}
			</section>
		);
	}
}

export default Comments
