import React, { Component } from 'react';

class Comments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: []
		};
	}

	componentDidMount()
	{
		fetch(`http://localhost/GolApi/getGridComments.php?gridId=${this.props.gridId}`)
			.then(response => response.json())
			.then(json => {
				this.setState({comments: json})
			});
	}
	
	render() {
		const commentsJSX = this.state.comments.map(
			item => 
			<div key={item.id}>
				<p>{item.author}</p>
				<p>{item.comment}</p>
			</div>);
		return (
			<section>
				{commentsJSX}
			</section>
		);
	}
}

export default Comments
