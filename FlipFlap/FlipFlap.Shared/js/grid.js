// The grid controls most of the game logic at this point.
var cell = {
	value: null,
	color: 'undefined' 
}

//--KS Needs to be made changable, rows and cols;


var grid = {
	rows: 10,	//Default
	cols: 10,	//Deafult
	maxScore: 10, 	//Default
	g: new Array(),
	top:-1,
	left:-1,
	matches:0,
	matchArray:[],
	playerScore:0,
	createGrid: function(r, c, s){
		this.rows = r || 10;
		this.cols = c || 10;
		this.maxScore = s || 10;
		for(var i = 0; i < this.rows; i++) {
			this.g.push(new Array());
			for(var j = 0; j < this.cols; j++) {
				this.g[i][j] = Object.create(cell);
			}
		}
	},
	drawGrid: function(element){
		for(var i = 0; i < this.rows; i++) {
			var d = document.createElement("div");
			var row = element.appendChild(d);
			row.setAttribute("class","row");
			for(var j = 0; j < this.cols; j++) {
				var s = document.createElement("div");
				s.setAttribute("class","cell");
				//s.innerText = i+","+j;
				row.appendChild(s);
				this.g[i][j].obj = s;
			}
		}
	},
	reset: function(){
		
	},
	
	updateCell: function(color, i, j){
		this.g[i][j].color = color;
		this.g[i][j].obj.style.backgroundColor = color;
	},
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
		square.textContent = '_'; //Firefox hack
		holder.appendChild(square);
		document.body.appendChild(holder);
	},
	handleMove: function(){

	},
	updateSquare: function(color){
		document.getElementById("sq").backgroundColor = color;
	},
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
		//var c = getNextColor();
		//holder.style.backgroundColor = c;
		square.style.backgroundColor = game.nextColor;
		this.updateCell(game.nextColor,this.left, this.top);
		this.score();
		game.animating = false;
		this.checkCanMove();
	},
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
	goToNextLevel: function() {
		// Setup the game grid
		gameGrid = Object.create(grid);
		gameGrid.createGrid(game.levels[game.currentLevel].columns,game.levels[game.currentLevel].rows,game.levels[game.currentLevel].maxScore);
		gameGrid.drawGrid(document.getElementById('board'));
		//gameGrid.updateCell('red',5,5);
		gameGrid.addSquare(2,1);

	
		//generateColorQueue(game.levels[game.currentLevel].colors);
		//drawColorQueue();
	},
	deleteGrid: function() {
		var div = document.getElementById('board');
		div.parentNode.removeChild(div);

		var newBoard = document.createElement('div');
		newBoard.id = 'board';

		document.getElementById('game').appendChild(newBoard);

	},

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

		document.getElementById('displayScore').innerText = 'Score: ' + this.playerScore + '/' + this.maxScore;
		document.getElementById('displayScore').textContent = 'Score: ' + this.playerScore + '/' + this.maxScore; //Firefox hack

		if(this.playerScore >= this.maxScore){
			//alert("You Beat the Level");
			console.log('You Beat the Level');
			game.currentLevel++;
			if(game.currentLevel >= game.numLevels)
			{
				//end the game
				alert('You Beat the game');
			}
			//Call goToNextLevel
			this.score = 0;
			this.deleteGrid();
			this.goToNextLevel();
		}

	},
	
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
	checkCanMove: function(){
		var moveUp = this.canMove("up");
		var moveDown = this.canMove("down");
		var moveLeft = this.canMove("left");
		var moveRight = this.canMove("right");

		if(moveUp === false && moveDown === false && moveLeft === false && moveRight === false){
			//Game Over!
			var square = document.getElementById('sq');
			square.innerText = ":(";
			square.textContent = ":(";  //Firefox hack
			$('#flipper').removeClass().addClass('endGame');
			game.isOver = true;
		}
	}
}