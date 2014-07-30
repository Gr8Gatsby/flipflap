// This file has helper functions for the color managment of square colors
// Default color pallate
var colors = ['#F14124', '#F9E900', '#A7EA52', '#5DCEAF', '#FF8021', '#B4DCFA'];

// Color queue that is displayed on the screen
var colorQueue = [];

// This function creates HTML DOM DIV elements to show the next
// three colors in the colorQueue
var drawColorQueue = function () {
    // Remove all the existing Elements Currently they are all identified
    // By the colorQueueCell class
    $(".colorQueueCell").remove();

    // Get the container object from the DOM for the colors
	var elem = document.getElementById("colors");

    // iterate through the colorQueue and create a new DIV element
	for(var i = 0; i < colorQueue.length; i++){
	    var c = document.createElement("div");

        // Set all the attributes and the styles
		c.setAttribute("class","colorQueueCell");
		c.style.backgroundColor = colorQueue[i];
		c.style.float = 'left';
		c.style.cssFloat = 'left';  //Mozilla Hack
		c.style.width = '30px';
		c.style.height = '30px';
		c.style.marginRight = '5px';
		c.style.textAlign = 'center';
		c.innerText = '<'; 

        // Add the color square to the color queue display
		elem.appendChild(c);
	}
}

// Initialize the colorQueue with 3 random values
var generateColorQueue = function(cNum){
	for(var i = 0; i < 3; i++) {
		colorQueue.push(getRandomColor(cNum));
	}
}

// Get a new color
var getNextColor = function(cNum){
    // Remove the next color
    var c = colorQueue.shift();
    // Add a new random color
    colorQueue.push(getRandomColor(cNum));
    // Redraw the color queue on the HTML page
	drawColorQueue();
    // Return the color that was removed
	return c;
}

//Get Random Color returns a random color from the colorQueue
var getRandomColor = function (cNum) {
    // Get a random color from the color palette
    return colors[Math.floor(Math.random() * cNum)];
}
