import React, { Component } from 'react';
import CommentForm from './CommentForm'
import { CommentConsumer } from '../context/commentContext'

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
		fetch(`http://localhost/GolApi/getGridComments.php?gridId=${this.props.gridId}&currentUserId=${this.props.userId}`)
			.then(response => response.json())
			.then(json => {
				this.setState({comments: json})
			});
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
				<p>{item.author} le {item.date}</p>
				<p>{item.comment}</p>
				<div>
					<button 
						title={item.likeState === 'liked' ? 'Je n\'aime plus' : 'J\'aime'}
						onClick={() => this.likeComment(item.id)}
					>like
					</button>
					{item.nbLikes}
					<button
						title={item.likeState === 'disliked' ? 'Pas si mal finalement...' : 'Je n\'aime pas!'}
						onClick={() => this.dislikeComment(item.id)}
					>dislike
					</button>
					{item.nbDislikes}
				</div>
			</div>
		);
		return (
			<section>
				{this.props.userId != 0 && <CommentForm addComment={this.addComment} userId={this.props.userId}/>}
				{commentsJSX}
			</section>
		);
	}
}

export default Comments
