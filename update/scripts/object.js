//*************************************************************
//  Filename: object.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

function object(type) {
  console.log("Object Created");
  
  this.initialize();
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