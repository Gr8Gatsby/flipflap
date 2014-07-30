var handleKeypress = function (e) {

	if(!game.animating) {
	    if(e.keyCode == 37 ||
            e.keyCode == 203 ||
            e.keyCode == 212 || 
            e.keyCode == 216) {
			// Left Arrow pressed
			game.direction = "left";
			if(gameGrid.canMove(game.direction)) {
				$('#flipper').removeClass().addClass('rotateLeft');
			}
	    } else if (e.keyCode == 38 ||
            e.keyCode == 201 ||
            e.keyCode == 209 ||
            e.keyCode == 213) {
			// Up Arrow pressed
			game.direction = "up";
			if(gameGrid.canMove(game.direction)) {
				$('#flipper').removeClass().addClass('rotateUp');
			}
	    } else if (e.keyCode == 39 ||
            e.keyCode == 204 ||
            e.keyCode == 211 ||
            e.keyCode == 215) {
			// Right Arrow pressed
			game.direction = "right";
			if(gameGrid.canMove(game.direction)) {
				$('#flipper').removeClass().addClass('rotateRight');
			}
	    } else if (e.keyCode == 40 ||
            e.keyCode == 202 ||
            e.keyCode == 210 ||
            e.keyCode == 214) {
			// Down Arrow pressed
			game.direction = "down";
			if(gameGrid.canMove(game.direction)) {
				$('#flipper').removeClass().addClass('rotateDown');
			}
		}
	}
};

var handleIEGestures = function(e){
	if (e.detail == e.MSGESTURE_FLAG_INERTIA){
		return;
	};
	if (!game.animating) {
	    if (Math.abs(e.velocityX) > Math.abs(e.velocityY)) {
	        // moving right or left
	        console.log("swipe");
	        if (e.velocityX < 0) {
	            console.log("left");
	            e.gestureObject.stop();
	            game.direction = "left";
	            if (gameGrid.canMove(game.direction)) {
	                $('#flipper').removeClass().addClass('rotateLeft');
	            }
	        } else {
	            console.log("right");
	            e.gestureObject.stop();
	            game.direction = "right";
	            if (gameGrid.canMove(game.direction)) {
	                $('#flipper').removeClass().addClass('rotateRight');
	            }
	        }
	    } else {
	        // moving up or down
	        console.log("swipe");
	        if (e.velocityY < 0) {
	            console.log("up");
	            e.gestureObject.stop();
	            game.direction = "up";
	            if (gameGrid.canMove(game.direction)) {
	                $('#flipper').removeClass().addClass('rotateUp');
	            }
	        } else {
	            console.log("down");
	            e.gestureObject.stop();
	            game.direction = "down";
	            if (gameGrid.canMove(game.direction)) {
	                $('#flipper').removeClass().addClass('rotateDown');
	            }
	        }
	    }
	}
};

//var hammerTime = ham
var handleWebkitGestures = function (e) {
    if (!game.animating) {
        if (e.type === "swipeup" || e.type === "dragup") {
            game.direction = "up";
            if (gameGrid.canMove(game.direction)) {
                $('#flipper').removeClass().addClass('rotateUp');
            }
        }

        if (e.type === "swipedown" || e.type === "dragdown") {
            game.direction = "down";
            if (gameGrid.canMove(game.direction)) {
                $('#flipper').removeClass().addClass('rotateDown');
            }
        }

        if (e.type === "swipeleft" || e.type === "dragleft") {
            game.direction = "left";
            if (gameGrid.canMove(game.direction)) {
                $('#flipper').removeClass().addClass('rotateLeft');
            }
        }

        if (e.type === "swiperight" || e.type === "dragright") {
            game.direction = "right";
            if (gameGrid.canMove(game.direction)) {
                $('#flipper').removeClass().addClass('rotateRight');
            }
        }
    }
}