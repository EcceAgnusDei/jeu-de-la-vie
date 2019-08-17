function showMiniature (json, canvasId)
{
	const squareCoords = json;
	let maxX = 0;
	let maxY = 0;
	const grid = new Grid(canvasId);

	for (let coord of squareCoords)
	{
		if (coord[0] > maxX)
		{
			maxX = coord[0];
		}
		if (coord[1] > maxY)
		{
			maxY = coord[1];
		}
	}

	grid.grid(7, maxX +5, maxY +5);
	grid.load(json);
}