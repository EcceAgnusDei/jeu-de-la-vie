import React from 'react'

function ArtworksNav(props) {
	return (
		<div>
			{props.visibility.prev && <div onClick={props.prev}>{'<'}</div>}
			{props.visibility.next && <div onClick={props.next}>{'>'}</div>}
		</div>
	);
}

export default ArtworksNav