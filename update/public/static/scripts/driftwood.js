//*************************************************************
//  Filename: driftwood.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

// Action enumerator
var MODE_DRAW = 0;
var MODE_MOVE = 1;

//*************************************************************
//  Function:
//      driftwood
//
//  Description:
//      Creates a prototype object to manage basic functions
// 		required throughout the project
//*************************************************************
function driftwood() 
{
}

//*************************************************************
//  Function:
//      driftwood.initialize
//
//  Description:
//      Initializes the driftwood object. Sets default values.
//*************************************************************
driftwood.prototype.initialize = function() 
{
  this.mode = MODE_DRAW;
  this.displayBoundVolumes = false;
  this.displayDebug = true;
  this.addEventListeners();
  $('#debug-text').css({'display':'none'});
}

//*************************************************************
//  Function:
//      driftwood.addEventListeners
//
//  Description:
//      Adds keyboard listener to the Driftwood object
//*************************************************************
driftwood.prototype.addEventListeners = function() 
{
  window.addEventListener('keypress', this.handleKeyboard.bind(this), false);
}

//*************************************************************
//  Function:
//      driftwood.handleKeyboard
//
//	Parameters:
//		event - the keyboard event
//
//  Description:
//      The keyboard manager that will trigger all keyboard events
//*************************************************************
driftwood.prototype.handleKeyboard = function(event) 
{
  var key = String.fromCharCode(event.charCode);

  // Toggles between drawing and moving modes
  if(key == 'd') 
  {
    this.mode = MODE_DRAW;
    ObjectManager.enterDrawMode();
    document.getElementById('mode-display').innerHTML = "Current Mode: Draw";
  }
  if(key == 'm') 
  {
    this.mode = MODE_MOVE;
    ObjectManager.enterMoveMode();
    document.getElementById('mode-display').innerHTML = "Current Mode: Move";
  }

	// Toggles wether or not bounding volumes are rendered when moving objects
	if(key == '[') 
	{
		this.displayBoundVolumes = !this.displayBoundVolumes;
		document.getElementById('bounding-display').innerHTML = "Bounding Volumes: " + this.displayBoundVolumes;
	}

	// Toggles debug text at the top of the screen on or off
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

	// Switch between the three layers of the canvas
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
