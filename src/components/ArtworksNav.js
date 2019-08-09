import React from 'react'

function ArtworksNav(props) {
	return (
		<div>
			<div onClick={props.prev}>{'<'}</div>
			<div onClick={props.next}>{'>'}</div>
		</div>
	);
}

export default ArtworksNav