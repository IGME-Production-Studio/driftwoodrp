//*************************************************************
//  Filename: object.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

function object(type) {
  console.log("Object Created");

  this.type = type;
}

object.prototype.initialize = function() {
  console.log("Object Initialized");
}

object.prototype.createStrokeObject = function(strokes, min, max, start) {
	this.strokes = strokes;
	this.min = min;
	this.max = max;
	this.start = start;
	console.log("start");
	console.log(this.start);
}

object.prototype.checkAABB = function(x, y) {
	if((x > this.min.x && x < this.max.x) && (y > this.min.y && y < this.max.y)) {
		console.log(this + " is clicked");
		return true;
	}
}

object.prototype.move = function(newPos) {
	var dx = newPos.x - this.start.x;
	var dy = newPos.y - this.start.y;
	this.start = newPos;

	console.log("Offset: " + dx + " - " + dy);

	this.min.x += dx;
	this.min.y += dy;
	this.max.x += dx;
	this.max.y += dy;

	for(var i = 0; i < this.strokes.length; i++) {
		this.strokes[i].start.x += dx;
		this.strokes[i].start.y += dy;
		this.strokes[i].end.x += dx;
		this.strokes[i].end.y += dy;
	}

	CanvasManager.render();
}

object.prototype.render = function() {
	for(var i = 1; i < this.strokes.length - 1; i++) {
		if((this.strokes[i].start.x != -1 && this.strokes[i].start.y != -1 && this.strokes[i].end.x != -1 && this.strokes[i].end.y != -1)) 
		Drawing.draw(this.strokes[i]);
	}

	//CanvasManager.context.rect(this.min.x, this.min.y, this.max.x, this.max.y);
	//CanvasManager.context.stroke();
}