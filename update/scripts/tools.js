//*************************************************************
//  Filename: tools.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

function tools() {
  console.log("Tools Object Created");
  this.mouseDown = false;
  this.drawing = false;
  this.lastPosition = {x:-1, y:-1};
}

tools.prototype.initialize = function() {
  console.log("Tools Initialized");
  Tools.addEventListeners();
}

tools.prototype.addEventListeners = function() {
	console.log("Added Listeners to Tools");
	// Adds the basic mouse movement functionality to the tools
	window.addEventListener('mousedown', Tools.onMouseDown);
	window.addEventListener('mouseup', Tools.onMouseUp);
	window.addEventListener('mousemove', Tools.onMouseMove);
}

tools.prototype.onMouseDown = function(event) {
	console.log("Tool Mouse Down Event");
	Tools.mouseDown = true;
}

tools.prototype.onMouseUp = function(event) {
	console.log("Tool Mouse Up Event");
	Tools.mouseDown = false;

	if(Tools.drawing) {
		Tools.drawing = false;
		Tools.lastPosition.x = -1; Tools.lastPosition.y = -1;
		Tools.convertDrawToObject();
	}
}

tools.prototype.onMouseMove = function(event) {
	if(Tools.mouseDown) {
		console.log("Tool Mouse Move Event");
		var startX = Tools.lastPosition.x == -1 ? event.offsetX : Tools.lastPosition.x;
		var startY = Tools.lastPosition.y == -1 ? event.offsetY : Tools.lastPosition.y;
		console.log(event);
		var drawData = {
			color: 'black',
			width: 5,
			start: {x: startX, y: startY},
			end: {x: event.offsetX, y: event.offsetY}
		};

		Tools.draw(drawData);
		Tools.lastPosition = drawData.end;
	}
}

tools.prototype.draw = function(drawData) {
	console.log("Draw");
	CanvasManager.context.beginPath();
	CanvasManager.context.moveTo(drawData.start.x, drawData.start.y);
	CanvasManager.context.lineTo(drawData.end.x, drawData.end.y);
	CanvasManager.context.lineCap = 'round';
	CanvasManager.context.lineWidth = drawData.width;
	CanvasManager.context.strokeStyle = drawData.color;
	CanvasManager.context.stroke();
	Tools.drawing = true;
}

tools.prototype.convertDrawToObject = function() {
	console.log("Convert Drawing to Object");
}