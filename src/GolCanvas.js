class GolCanvas
{
	constructor (canvasID)
	{
		this.canvas = document.getElementById(canvasID);
		this.ctx = this.canvas.getContext("2d");
		this.squareCoord = [];
		this.squareStatus = {};
		this.squareSize = 0;
		this.rubber = false;
		this.isPlaying = false;
		this.countdown = setInterval(() => {}, 99999999);
		this.saved = [];
	}

	/**
	 * Fonction permettant de calculer la position de la souris dans le canvas
	 * @param  {Object} canvas 
	 * @param  {Event} evt    
	 * @return {Object} Coordonnées x et y sous forme d'objet
	 */
	getMousePos (canvas, evt)
	{
		let rect = canvas.getBoundingClientRect();
		return { x: (evt.clientX - rect.left) * (canvas.width  / rect.width),
			y: (evt.clientY - rect.top)  * (canvas.height / rect.height)
		};
	}

	/**
	 * Methode permettant de d'initialiser la grille
	 * @param {int} squareSize Taille d'un carré en pixels
	 * @param {int} nbCol Nombre de colonnes de la grille
	 * @param {int} nbRow Nombre de ligne de la grille
	 */
	grid (squareSize, nbCol, nbRow)
	{
		this.squareSize = squareSize;
		this.canvas.width = nbCol * squareSize;
		this.canvas.height = nbRow * squareSize;

		this.squareCoord = [];
		this.squareStatus = {};

		this.ctx.beginPath();
		this.ctx.rect(0, 0,this.canvas.width, this.canvas.height);
		this.ctx.fillStyle = 'white';
  		this.ctx.fill();

		for (let x = 0 ; x < this.canvas.width ; x += squareSize)
		{
			this.ctx.beginPath();
			this.ctx.strokeStyle = "black";
			this.ctx.moveTo(x, 0);
        	this.ctx.lineTo(x, this.canvas.height);
        	this.ctx.closePath();
        	this.ctx.stroke();
        	for (let y = 0 ; y < this.canvas.height ; y += squareSize)
        	{
        		this.squareCoord.push([x, y]);
        		this.squareStatus[[x, y]] = false;
        	}
		}

		for (let y = 0 ; y < this.canvas.height ; y += squareSize)
		{
			this.ctx.beginPath();
			this.ctx.strokeStyle = "black";
			this.ctx.moveTo(0, y);
        	this.ctx.lineTo(this.canvas.width, y);
        	this.ctx.closePath();
        	this.ctx.stroke();
		}
	}

	/**
	 * Methode permettant de remplire un carré
	 * @param {int} x abscisse quelconque à l'interieur du carré que l'on veut colorier
	 * @param {int} y ordonnée du carré
	 * @param {string} color couleur avec laquelle on veut que le carré soit rempli
	 */
	fillRect(x, y, color)
	{
		for (let i = 0 ; i < this.squareCoord.length ; i++)
		{
			if (x >= this.squareCoord[i][0] && x < this.squareCoord[i][0] + this.squareSize && 
				y >= this.squareCoord[i][1] && y < this.squareCoord[i][1] + this.squareSize)
			{
				if(color == 'black') {this.squareStatus[this.squareCoord[i]] = true;}
				if(color == 'white') {this.squareStatus[this.squareCoord[i]] = false;}
				let beginX = this.squareCoord[i][0];
				let beginY = this.squareCoord[i][1];
				this.ctx.beginPath();
				this.ctx.rect(beginX+1, beginY+1,this.squareSize-2, this.squareSize-2);
				this.ctx.fillStyle = color;
				this.ctx.fill();
			}
		}
	}

	/**
	 * Compte le nombre de voisins noirs d'un carré
	 * @param {Array} coord Coordonnées du carré
	 * @return {int} le nombre de voisins
	 */
	countNeighbors(coord)
	{
		let count = 0;
		for (let x = coord[0] - this.squareSize ; x <= coord[0] + this.squareSize ; x += this.squareSize)
		{
			for (let y = coord[1] - this.squareSize ; y <= coord[1] + this.squareSize ; y += this.squareSize)
			{
				if (this.squareStatus[[x, y]] && (x != coord[0] || y!= coord[1]))
				{
					count++;
				}
			}
		}
		return count;
	}

	/**
	 * Passe à l'étape suivante
	 */
	next ()
	{
		let temps = new Date();
		let setBlack = [];
		let setWhite = [];
		for (let i=0 ; i < this.squareCoord.length ; i++)
		{
			if (this.countNeighbors(this.squareCoord[i]) === 3)
			{
				setBlack.push(this.squareCoord[i]);
			}
			else if (this.squareStatus[this.squareCoord[i]])
			{
				if (this.countNeighbors(this.squareCoord[i]) > 3 || this.countNeighbors(this.squareCoord[i]) < 2)
				{
					setWhite.push(this.squareCoord[i]);
				}
			}
		}

		for (let i=0 ; i < setBlack.length ; i++)
		{
			this.fillRect(setBlack[i][0], setBlack[i][1], 'black');
		}

		for (let i=0 ; i < setWhite.length ; i++)
		{
			this.fillRect(setWhite[i][0], setWhite[i][1], 'white');
		}

		let now = new Date()
		console.log(now - temps);
	}

	/**
	 * Réinitialise la grille
	 */
	clear()
	{
		for (let coord of this.squareCoord)
		{
			this.fillRect(coord[0], coord[1], 'white');
		}
	}

	/**
	 * Charge une grille placée en paramètre.
	 * @param {Array} coords Tableau de coordonnées.
	 */
	 load(coords = this.saved)
	 {
	 	this.clear();
	 	for (let coord of coords)
	 	{
	 		this.fillRect(coord[0]*this.squareSize, coord[1]*this.squareSize, 'black');
	 	}
	 }

	 /**
	  * Enregistre la configuration actuelle
	  * @return {Array} Tableau de coordonnées
	  */
	 save()
	 {
	 	let coordsBlack = [];

	 	for (let coord of Object.keys(this.squareStatus))
	 	{
	 		if (this.squareStatus[coord])
	 		{
	 			coordsBlack.push([this.stringToArray(coord)[0]/this.squareSize, this.stringToArray(coord)[1]/this.squareSize]);
	 		}
	 	}

	 	this.saved = coordsBlack;

	 	return coordsBlack;
	 }


	/**
	 * Méthode transformant une chaine de caractère en array de longueur 2.
	 * Méthode nécessaire car javascript transforme nativement un array en string 
	 * lorsque celle-ci est utilisée en tant que clef. 
	 */
	stringToArray(string)
	{
		let part1 = "";
		let part2 = "";
		let array = [];

		let i = 0;
		while(string[i] != ',')
		{
			part1 += string[i];
			i++;
		}

		i++

		for (i ; i < string.length ; i++)
		{
			part2 += string[i];
		}

		array.push(parseInt(part1));
		array.push(parseInt(part2));

		return array;
	}

	/**
	 * Ajoute les évènements nécessaires
	 */
	addEvents()
	{
		this.canvas.addEventListener("mousemove", function(evt) {
			let mousePos = this.getMousePos(this.canvas, evt);
		}.bind(this));

		this.canvas.addEventListener("click", function(evt){
			let mousePos = this.getMousePos(this.canvas, evt);
			if(this.rubber)
			{
				this.fillRect(mousePos.x, mousePos.y, 'white');
			}
			else
			{
			this.fillRect(mousePos.x, mousePos.y, 'black');
			}
		}.bind(this));
	}

	play(interval)
	{
		if (!this.isPlaying) {
			this.countdown = setInterval(() => this.next(), interval);
			this.isPlaying = true;
		}
	}

	stop()
	{
		this.isPlaying = false;
		clearInterval(this.countdown);
	}

	switchColor()
	{
		this.rubber = !this.rubber;
	}
}

export default GolCanvas;