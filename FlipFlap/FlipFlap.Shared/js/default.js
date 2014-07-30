// Global object to hold the gesture information for touch events
var gameGesture;

// Detect when the document has loaded
$(document).ready(function(){
    // Check if user has run game before
    if (hasUserRunBefore()) {
        startInsturctions();
    } else {
        init();
        login();
    }
});

// Local Storage to see if user has launched for first time
// Allow skipping instructions?
// 

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


    //xbox init
	if (typeof Xbox !== 'undefined') {
	    Xbox.initVoice();
	}

	// Setup the game grid
	gameGrid = Object.create(grid);
	gameGrid.createGrid(game.levels[game.currentLevel].columns,game.levels[game.currentLevel].rows,game.levels[game.currentLevel].maxScore);

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
	

	generateColorQueue(game.levels[game.currentLevel].colors);

	drawColorQueue();

}

function login() {
	$('a.login-window').click(function() {
	
		// Getting the variable's value from a link 
		var loginBox = $(this).attr('href');

		//Fade in the Popup and add close button
		$(loginBox).fadeIn(300);
	
		//Set the center alignment padding + border
		var popMargTop = ($(loginBox).height() + 24) / 2; 
		var popMargLeft = ($(loginBox).width() + 24) / 2; 
	
		$(loginBox).css({ 
			'margin-top' : -popMargTop,
			'margin-left' : -popMargLeft
		});
	
		// Add the mask to body
		$('body').append('<div id="mask"></div>');
		$('#mask').fadeIn(300);
	
		return false;
	});

	// When clicking on the button close or the mask layer the popup closed
	$('a.close, #mask').live('click', function() { 
	  $('#mask , .login-popup').fadeOut(300 , function() {
		$('#mask').remove();  
	}); 
	return false;
	});
	
// 	$("#googleLoginButton").button().click(function(){
//         //google-logIn();
//         alert("button");
//     }); 
//     $("#facebookLoginButton").button().click(function(){
//         facebook-logIn();
//         alert("button");
//     }); 
//     $("#twitterLoginButton").button().click(function(){
//         twitter-logIn();
//         alert("button");
//     }); 
}

function flipperAnimationEnded(e) {
	if(!game.isOver){
		gameGrid.moveSquare(game.direction);
	}
}

function flipperAnimationStarted(e) {
    game.animating = true;
    game.nextColor = getNextColor(game.levels[game.currentLevel].colors);
    document.getElementById('flipper').style.backgroundColor = game.nextColor;
}