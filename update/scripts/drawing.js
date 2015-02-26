//*************************************************************
//  Filename: drawing.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

function drawing() {
  this.mouseDown = false;
  this.drawing = false;
  this.lastPosition = {x:-1, y:-1};
  this.drawMin = {x:-1, y:-1};
  this.drawMax = {x:-1, y:-1};
  this.startPosition = {x:-1, y:-1};
  this.currentStroke = [];
}

drawing.prototype.initialize = function() {
  this.addEventListeners();
}

drawing.prototype.addEventListeners = function() {
	// Adds the basic mouse movement functionality to the drawing
	window.addEventListener('mousedown', this.onMouseDown.bind(this), false);
	window.addEventListener('mouseup', this.onMouseUp.bind(this), false);
	window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
}

drawing.prototype.onMouseDown = function(event) {
	this.mouseDown = true;
}

drawing.prototype.onMouseUp = function(event) {
	this.mouseDown = false;

	if(this.drawing) {
		this.drawing = false;

		var w = this.drawMax.x - this.drawMin.x;
		var h = this.drawMax.y - this.drawMin.y;

		//CanvasManager.context.rect(this.drawMin.x, this.drawMin.y, w, h);
		//CanvasManager.context.stroke();

		this.convertDrawToObject();

		this.startPosition.x = -1; this.startPosition.y = -1;
		this.lastPosition.x = -1; this.lastPosition.y = -1;
		this.currentStroke = [];
	}
}

drawing.prototype.onMouseMove = function(event) {
	if(this.mouseDown && Driftwood.mode == MODE_DRAW) {
		var startX = this.lastPosition.x == -1 ? event.offsetX : this.lastPosition.x;
		var startY = this.lastPosition.y == -1 ? event.offsetY : this.lastPosition.y;

		this.startPosition.x = this.startPosition.x == -1 ? event.offsetX : this.startPosition.x;
		this.startPosition.y = this.startPosition.y == -1 ? event.offsetY : this.startPosition.y;

		var lineStart = {x: startX, y: startY};
		var lineEnd = {x: event.offsetX, y: event.offsetY};

		if(!this.drawing) {
			this.drawMin = lineStart;
			this.drawMax = lineEnd;
		}
		else {
			if(this.drawMin.x > lineStart.x) {
				this.drawMin.x = lineStart.x;
			} 
			if(this.drawMin.y > lineStart.y) {
				this.drawMin.y = lineStart.y;
			}

			if(this.drawMax.x < lineEnd.x) {
				this.drawMax.x = lineEnd.x;
			}
			if(this.drawMax.y < lineEnd.y) {
				this.drawMax.y = lineEnd.y;
			}
		}

		var drawData = {
			color: 'black',
			width: 5,
			start: lineStart,
			end: lineEnd
		};

		this.draw(drawData);
		this.currentStroke.push(drawData);
		this.lastPosition = lineEnd;
	}
}

drawing.prototype.draw = function(drawData) {
	CanvasManager.context.beginPath();
	CanvasManager.context.moveTo(drawData.start.x, drawData.start.y);
	CanvasManager.context.lineTo(drawData.end.x, drawData.end.y);
	CanvasManager.context.lineCap = 'round';
	CanvasManager.context.lineWidth = drawData.width;
	CanvasManager.context.strokeStyle = drawData.color;
	CanvasManager.context.stroke();
	this.drawing = true;
}

drawing.prototype.convertDrawToObject = function() {
	var obj = new object("stroke");
	obj.initialize();
	obj.createStrokeObject(this.currentStroke, this.drawMin, this.drawMax, this.startPosition);
	ObjectManager.addObject(obj);
}