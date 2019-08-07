let save = [];
let countdown = setInterval (function() {}, 9999999);
let grid;
let isPlaying = false;

window.addEventListener("load", main);

function main()
{
	grid = new Grid("canvas");
	grid.addEvents();

	let cols = document.getElementById("cols");
	let rows = document.getElementById("rows");
	let squareSize = document.getElementById("square-size");
	let speed = document.getElementById("speed");
	grid.grid(parseInt(squareSize.value), parseInt(cols.value), parseInt(rows.value));
	
	$('#reload').click(function(){
		console.log('reload');
		stop();
		grid.clear();
	});
	$('#next').click(function(){
		console.log('next');
		grid.next();
	});
	$('#set-grid').click(function() {
		let nbCols = parseInt(cols.value);
		let nbRows = parseInt(rows.value);
		let size = parseInt(squareSize.value);
		if (isNaN(nbCols) || isNaN(nbRows) || isNaN(size))
		{
			alert("Veuillez entrer des valeurs valides !");
		}
		else if (nbCols > 100 || nbRows > 100 || size > 50)
		{
			alert("Les valeurs rentrées sont trop grandes !");
		}
		else if (nbCols < 5 || nbRows < 5 || size < 5)
		{
			alert('Les valeurs sont trop petites !')
		}
		else
		{
			grid.grid(parseInt(squareSize.value), parseInt(cols.value), 
				parseInt(rows.value));
			grid.load(save);
		}
	});
	$('#play').click(function(){
		if(!isPlaying)
		{
			play(1000/speed.value);
		}
	});
	$('#stop').click(function(){
		stop();
	});
	$('#load').click(function(){
		grid.load(save);
	});
	$('#save').click(function(){
		save = grid.save();
		$('#grid-json').val(JSON.stringify(save));
	});
	$('#save-db').click(function(){
		if($('#grid-json').val() == '')
		{
			save = grid.save();
			$('#grid-json').val(JSON.stringify(save));
		}
	});
	$('#rubber').click(function(){
		if (grid.rubber)
		{
			grid.rubber = false;
			$('#rubber').html('<i class="fas fa-eraser"></i>');
		}
		else
		{
			grid.rubber = true;
			$('#rubber').html('<i class="fas fa-pencil-alt"></i>');
		}
	});
	$('#speed').change(function(){
		console.log(isPlaying);
		if(isPlaying)
		{
			stop();
			play(1000/speed.value);
		}
	});
}

function play(interval)
{
	isPlaying = true;
	countdown = setInterval(function(){
		grid.next() }, interval);
}

function stop()
{
	isPlaying = false;
	clearInterval(countdown);
}