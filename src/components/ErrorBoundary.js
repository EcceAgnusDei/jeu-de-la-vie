import React, { Component } from 'react';
import error from '../img/error.png';

class ErrorBoundary extends Component {
	constructor() {
		super();
		this.state = {
			hasError: false,
			error: ''
		};
	}

	static getDerivedStateFromError(error) {
		return {
			hasError: true
		}
	}

	componentDidCatch(error, info) {
		this.setState({
			error: error.toString().slice(7)
		});
	}
	
	render() {
		if (this.state.hasError) {
			return <main className="error">
				<img src={error}/>
				<h1>Oups, une erreur est survenue:</h1>
				<p>{this.state.error}</p>
			</main>
		}
		return this.props.children;
	}
}

export default ErrorBoundary
