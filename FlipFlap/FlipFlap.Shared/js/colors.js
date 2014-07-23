var colors = ['#873129', '#F1C999', '#F38821', '#F9E900', '#7ABAA6', '#21C0F5'];
var colorQueue = [];
//Get Random Color returns a random color from the colorQueue
var getRandomColor = function() {
	return colors[Math.floor(Math.random() * colors.length )];
}

var drawColorQueue = function(){
	$(".colorQueueCell").remove();
	var elem = document.getElementById("colors");

	for(var i = 0; i < colorQueue.length; i++){
		var c = document.createElement("div");
		c.setAttribute("class","colorQueueCell");
		c.style.backgroundColor = colorQueue[i];
		c.style.float = 'left';
		c.style.cssFloat = 'left';  //Mozilla Hack
		c.style.width = '30px';
		c.style.height = '30px';
		c.style.marginRight = '5px';
		c.style.textAlign = 'center';
		c.innerText = '<'; 

		elem.appendChild(c);
	}
}

var generateColorQueue = function(){
	for(var i = 0; i < 3; i++) {
		colorQueue.push(getRandomColor());
	}
}

var getNextColor = function(){
	var c = colorQueue.shift();
	colorQueue.push(getRandomColor());
	drawColorQueue();
	return c;
}