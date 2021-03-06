import React from 'react'

function ArtworksNav(props) {
	return (
		<div className="artworks-nav">
			{props.currentPage != 0 && 
			<button className="nav-btn" onClick={props.prev}><i className="fas fa-chevron-left"></i></button>}
			{props.currentPage < props.maxPage && 
			<button className="nav-btn" onClick={props.next}><i className="fas fa-chevron-right"></i></button>}
		</div>
	);
}

export default ArtworksNav