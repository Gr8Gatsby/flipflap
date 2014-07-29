// The grid controls the game logic for moving and scoring.  All of the events in this game are triggered from the keys.js file
var cell = {
	value: null,
	color: 'undefined' 
}

// JavaScript Object representing the grid
var grid = {
	rows: 10,	                // Default rows
	cols: 10,	                // Deafult cols
	g: new Array(),             // Game grid
	top:-1,                     // init current square
	left:-1,                    // init current square
	matches:0,                  // Total matches found in a turn
	matchArray:[],              // Total matched objects found in a turn
	playerScore: 0,              // The total player score for a game

    // This function initializes the data for the grid
    // INPUT: r = rows, c = columns. will default to 10 x 10
	createGrid: function(r, c){
		this.rows = r || 10;
		this.cols = c || 10;
		for(var i = 0; i < this.rows; i++) {
			this.g.push(new Array());
			for(var j = 0; j < this.cols; j++) {
				this.g[i][j] = Object.create(cell);
			}
		}
	},

    // This function creates the HTML elements for rows and columns
    // INPUT: The parent HTML element to host the grid
	drawGrid: function (element) {
		for(var i = 0; i < this.rows; i++) {
			var d = document.createElement("div");
			var row = element.appendChild(d);
			row.setAttribute("class","row");
			for(var j = 0; j < this.cols; j++) {
				var s = document.createElement("div");
				s.setAttribute("class","cell");
				row.appendChild(s);
				this.g[i][j].obj = s;
			}
		}
	},

    // This function updates the actual Background Color of the cell
    // as well as the 'color' data for the cell
	updateCell: function(color, i, j){
		this.g[i][j].color = color;
		this.g[i][j].obj.style.backgroundColor = color;
	},

    // This function adds the initial "flipper" square to the grid
	addSquare: function(i, j){
		this.left = i;
		this.top = j;
		var holder = document.createElement("div");
		holder.setAttribute("id","flipper");
		holder.style.top = this.g[i][j].obj.offsetTop  + "px";
		holder.style.left = this.g[i][j].obj.offsetLeft + "px";
		var square = document.createElement("div");
		square.setAttribute("id","sq");
		square.setAttribute("class", "square");
		square.innerText = '_';
		square.textContent = '_';                                   // Firefox hack
		holder.appendChild(square);
		document.body.appendChild(holder);
	},

	// This function moves the 'flipper' square
	moveSquare: function(dir){
		var holder = document.getElementById('flipper');
		var square = document.getElementById('sq');
		$('#flipper').removeClass();
		switch(dir){
			case "left":			
				this.left--;
				break;
			case "right":			
				this.left++;
				break;
			case "up":			
				this.top--;
				break;
			case "down":			
				this.top++;
				break;
		}

		holder.style.left = this.g[this.left][this.top].obj.offsetLeft + "px";
		holder.style.top = this.g[this.left][this.top].obj.offsetTop + 0.2 + "px";

		square.style.backgroundColor = game.nextColor;
		this.updateCell(game.nextColor,this.left, this.top);
		this.score();
		game.animating = false;
		this.checkCanMove();
	},

    // This function checks to see if the flipper can move
	canMove: function(dir){
		switch(dir){
			case "left":			
				if(this.left > 0 && this.g[this.left - 1][this.top].color == 'undefined') {
					return true;
				};
				break;
			case "right":			
				if(this.left < (this.cols - 1) && this.g[this.left + 1][this.top].color == 'undefined') {
					return true;
				}
				break;
			case "up":			
				if(this.top > 0 && this.g[this.left][this.top - 1].color == 'undefined') {
					return true;
				};
				break;
			case "down":			
				if(this.top < (this.rows - 1) && this.g[this.left][this.top + 1].color == 'undefined') {
					return true;
				};
				break;
			default:
				return false;
		}
		return false;
	},

    // This function checks to see if there are enough squares to score
    // This will recusively call the checkMatch function if it finds any
    // matching squares
	score: function(){

		var row = this.left;
		var col = this.top; 
		var square = document.getElementById('sq');
		matches = 0;
		matchArray = [];

		// looking up
		if(row - 1 >= 0){
			if(this.g[row - 1][col].obj.style.backgroundColor === square.style.backgroundColor){
				matchArray.push(this.g[row - 1][col]);
				this.checkMatch((row - 1), col, 'down');
			}
		}
		// looking down
		if(row + 1 < this.rows){
			if(this.g[row + 1][col].obj.style.backgroundColor === square.style.backgroundColor){
				matchArray.push(this.g[row + 1][col]);	
				this.checkMatch((row + 1), col, 'up');
			}
		}
		// looking left
		if(col - 1 >= 0){
			if(this.g[row][col - 1].obj.style.backgroundColor === square.style.backgroundColor){
				matchArray.push(this.g[row][col - 1]);
				this.checkMatch(row, (col - 1), 'right');
			}
		}
		// looking right
		if(col + 1 < this.cols){
			if(this.g[row][col + 1].obj.style.backgroundColor === square.style.backgroundColor){
				matchArray.push(this.g[row][col + 1]);
				this.checkMatch(row, (col + 1), 'left');
			}
		}

		if(matchArray.length >= 2){
			for(var i = 0; i < matchArray.length; i++){
				matchArray[i].obj.style.backgroundColor = '#077A75';
				matchArray[i].color = 'undefined';
				this.playerScore++;
			}
		}

		document.getElementById('displayScore').innerText = 'Score: ' + this.playerScore;
		document.getElementById('displayScore').textContent = 'Score: ' + this.playerScore; //Firefox hack

	},
    // This is a recursive function that will check for adjacent matches
    // in the grid
	checkMatch: function(i, j, ignore){
		var row = i;
		var col = j;
		var square = this.g[i][j].obj;

		// looking up
		if(row - 1 >= 0 && ignore != 'up'){
			if(this.g[row - 1][col].obj.style.backgroundColor === square.style.backgroundColor){
				matchArray.push(this.g[row - 1][col]);
				this.checkMatch((row - 1), col, 'down');
			}
		}
		// looking down
		if(row + 1 < this.rows && ignore != 'down'){
			if(this.g[row + 1][col].obj.style.backgroundColor === square.style.backgroundColor){
				matchArray.push(this.g[row + 1][col]);
				this.checkMatch((row + 1), col, 'up');
			}
		}
		// looking left
		if(col - 1 >= 0 && ignore != 'left'){
			if(this.g[row][col - 1].obj.style.backgroundColor === square.style.backgroundColor){
				matchArray.push(this.g[row][col - 1]);
				this.checkMatch(row, (col - 1), 'right');
			}
		}
		// looking right
		if(col + 1 < this.cols && ignore != 'right'){
			if(this.g[row][col + 1].obj.style.backgroundColor === square.style.backgroundColor){
				matchArray.push(this.g[row][col + 1]);
				this.checkMatch(row, (col + 1), 'left');
			}
		}	
	},
    // This function checks to see if there are any moves possible
    // If there are no more moves possible then the game ends
	checkCanMove: function(){
		var moveUp = this.canMove("up");
		var moveDown = this.canMove("down");
		var moveLeft = this.canMove("left");
		var moveRight = this.canMove("right");

		if(moveUp === false && moveDown === false && moveLeft === false && moveRight === false){
			//Game Over!
			var square = document.getElementById('sq');
			square.innerText = ":(";
			square.textContent = ":(";                              // Firefox hack
			$('#flipper').removeClass().addClass('endGame');
			game.isOver = true;
		}
	}
}