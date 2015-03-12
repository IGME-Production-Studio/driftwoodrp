//*************************************************************
//  Filename: driftwood.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

var MODE_DRAW = 0;
var MODE_MOVE = 1;

function driftwood() 
{
  //console.log("Driftwood Object Created");
}

driftwood.prototype.initialize = function() 
{
  //console.log("Driftwood Initialized");
  this.mode = MODE_DRAW;
  this.displayBoundVolumes = false;
  this.displayDebug = true;
  this.addEventListeners();
}

driftwood.prototype.addEventListeners = function() 
{
	window.addEventListener('keypress', this.handleKeyboard.bind(this), false);
}

driftwood.prototype.handleKeyboard = function(event) 
{
	var key = String.fromCharCode(event.charCode);

	if(key == 'd') 
	{
		this.mode = MODE_DRAW;
		document.getElementById('mode-display').innerHTML = "Current Mode: Draw";
	}
	if(key == 'm') 
	{
		this.mode = MODE_MOVE;
		document.getElementById('mode-display').innerHTML = "Current Mode: Move";
	}

	if(key == '[') 
	{
		this.displayBoundVolumes = !this.displayBoundVolumes;
		document.getElementById('bounding-display').innerHTML = "Bounding Volumes: " + this.displayBoundVolumes;
	}

	if(key == '1') 
	{
		this.displayDebug = !this.displayDebug;
		if(this.displayDebug)
		{
			$('#debug-text').css({'display':'block'});
		}
		else
		{
			$('#debug-text').css({'display':'none'});
		}
	}

	if(key == '2')
	{
		CanvasManager.changeLayer("map");
	}
	if(key == '3') 
	{
		CanvasManager.changeLayer("object");
	}
	if(key == '4')
	{
		CanvasManager.changeLayer("gm");
	}
}