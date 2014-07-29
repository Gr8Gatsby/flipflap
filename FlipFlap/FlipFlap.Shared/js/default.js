// Global object to hold the gesture information for touch events
var gameGesture;

// Detect when the document has loaded
$(document).ready(function(){
    // initialize
    init();
});

// Inialize all the events for the game
function init() {
    // Handle the Window Resize event, redraw the grid to fill the screen
    window.onresize = function (e) {
        console.log('height:' + $(document).height() + ' width:' + $(document).width());
        //TODO: Redraw the grid

        //

    }
    
	// Setup event listener for Keydown event
	window.addEventListener('keydown', handleKeypress, true);
	console.log('Application init');

	// Detect pointer events for IE and Windows
	if(window.navigator.msPointerEnabled){
		gameGesture = new MSGesture();
		gameGesture.target = document.body;
		document.body.addEventListener("MSGestureChange", handleIEGestures, false);
		document.body.addEventListener("pointerdown", function(e){
			gameGesture.addPointer(e.pointerId);
		}, true);
	} else {
	    var element = document.getElementById('board');
	    gameGesture = Hammer(element).on("swipeleft swiperight swipeup swipedown dragup dragdown dragleft dragright", function (event) {
	        handleWebkitGestures(event);
	    });
	}

	// Setup the game grid
	gameGrid = Object.create(grid);
	gameGrid.createGrid(10,10);
	gameGrid.drawGrid(document.getElementById('board'));
	//gameGrid.updateCell('red',5,5);
	gameGrid.addSquare(2,1);

	// Setup event listeners for CSS Animations
	var flipper = document.getElementById('flipper');

    //IE event listeners
	flipper.addEventListener('MSAnimationEnd', flipperAnimationEnded, false);
	flipper.addEventListener('MSAnimationStart', flipperAnimationStarted, false);

    // Webkit event listeners
	flipper.addEventListener('webkitAnimationEnd', flipperAnimationEnded, false);
	flipper.addEventListener('webkitAnimationStart', flipperAnimationStarted, false);

    // Firefox event listeners
	flipper.addEventListener('animationend', flipperAnimationEnded, false);
	flipper.addEventListener('animationstart', flipperAnimationStarted, false);
	
    // Generate the colorqueue
	generateColorQueue();

    // Draw the colorqueue
	drawColorQueue();

}

function flipperAnimationEnded(e) {
	if(!game.isOver){
		gameGrid.moveSquare(game.direction);
	}
}

function flipperAnimationStarted(e) {
    game.animating = true;
    game.nextColor = getNextColor();
    document.getElementById('flipper').style.backgroundColor = game.nextColor;
}