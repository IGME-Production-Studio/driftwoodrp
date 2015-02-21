//*************************************************************
//  Filename: driftwood.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

var MODE_DRAW = 0;
var MODE_MOVE = 1;

function driftwood() {
  console.log("Driftwood Object Created");
}

driftwood.prototype.initialize = function() {
  console.log("Driftwood Initialized");
  this.mode = MODE_DRAW;
  this.addEventListeners();
}

driftwood.prototype.addEventListeners = function() {
	window.addEventListener('keypress', this.handleKeyboard.bind(this), false);
}

driftwood.prototype.handleKeyboard = function(event) {
	var key = String.fromCharCode(event.charCode);

	if(key == 'd') {
		Driftwood.mode = MODE_DRAW;
		document.getElementById('mode-display').innerHTML = "Current Mode: Draw";
	}
	if(key == 'm') {
		Driftwood.mode = MODE_MOVE;
		document.getElementById('mode-display').innerHTML = "Current Mode: Move";
	}
}