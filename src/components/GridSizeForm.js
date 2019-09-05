import React, { useState } from 'react';
import useInput from '../hooks/useInput';

function GridSizeForm(props) {
	const [cols, bindCols, resetCols] = useInput(70);
	const [rows, bindRows, resetRows] = useInput(40);
	const [squareSize, bindSquareSize, resetSquareSize] = useInput(20);

	const [tooBig, setTooBig] = useState(false);

	function handleSubmit(event)
	{
		event.preventDefault();
		
		if (cols * rows > 20000)
		{
			setTooBig(true);
		} else {
			props.handleSizing(parseInt(squareSize), parseInt(cols), parseInt(rows));
		}
	}

	return (
		<React.Fragment>
			<form className="grid_size-form" onSubmit={handleSubmit}>
				<label>Colonnes
					<input type="text" name="cols" {...bindCols}/>
				</label>
				<label>Lignes
					<input type="text" name="rows" {...bindRows}/>
				</label>
				<label>Taille des carrés
					<input type="text" name="squareSize" {...bindSquareSize}/>
				</label>
				<button className="btn">Afficher la grille</button>
			</form>
			{tooBig &&
			<div className="grid_size-error">La grille est trop grande!</div>
			}
		</React.Fragment>
	);
}

export default GridSizeForm
