import React from 'react'

function ArtworksNav(props) {
	return (
		<div className="artworks-nav">
			{props.visibility.prev && <button className="nav-btn" onClick={props.prev}><i class="fas fa-chevron-left"></i></button>}
			{props.visibility.next && <button className="nav-btn" onClick={props.next}><i class="fas fa-chevron-right"></i></button>}
		</div>
	);
}

export default ArtworksNav