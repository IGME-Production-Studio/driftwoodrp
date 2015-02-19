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

object.prototype.createStrokeObject = function(strokes, min, max) {
	this.strokes = strokes;
	this.min = min;
	this.max = max;
}

object.prototype.checkAABB = function(x, y) {
	console.log("(" + x + ", " + y + ")");
}