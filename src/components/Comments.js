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
		fetch(`http://localhost/GolApi/getGridComments.php?gridId=${this.props.gridId}`)
			.then(response => response.json())
			.then(json => {
				this.setState({comments: json})
			});
	}

	addComment(comment, userId)
	{
		fetch(`http://localhost/GolApi/addComment.php`, {
			method: 'POST',
			body: JSON.stringify([this.props.gridId, userId, comment])
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
	
	render() {
		const commentsJSX = this.state.comments.map(
			item => 
			<div key={item.id}>
				<p>{item.author} le {item.date}</p>
				<p>{item.comment}</p>
			</div>);
		return (
			<section>
				<CommentConsumer>
				{
					(value) => {
						return value != 0 && <CommentForm addComment={this.addComment} userId={value}/>
					}
				}
				</CommentConsumer>
				{commentsJSX}
			</section>
		);
	}
}

export default Comments
