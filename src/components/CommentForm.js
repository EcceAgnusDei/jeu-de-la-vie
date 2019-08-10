import React, { Component } from 'react';

class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({comment: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.addComment(event.target.comment.value);
		this.setState({comment: ''});
	}
	
	render() {
		return (
			<div>
				<h2>Laissez un commentaire</h2>
				<form onSubmit={this.handleSubmit}>
					<textarea name="comment" value={this.state.comment} onChange={this.handleChange}/>
					<button>Envoyer</button>
				</form>
			</div>
		);
	}
}

export default CommentForm
