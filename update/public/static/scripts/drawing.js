//*************************************************************
//  Filename: drawing.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

//*************************************************************
//  Function:
//      drawing
//
//  Description:
//      Creates a prototype object to manage all drawing functions
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

//*************************************************************
//  Function:
//      drawing.initialize
//
//  Description:
//      Triggers call to add event listeners
//*************************************************************
drawing.prototype.initialize = function() {
  this.addEventListeners();
}

//*************************************************************
//  Function:
//      drawing.addEventListeners
//
//  Description:
//      Adds mouse event listeners to the drawing object
//
//	ToDo:
//		Add touch support
//*************************************************************
drawing.prototype.addEventListeners = function() {
  // Adds the basic mouse movement functionality to the drawing
  window.addEventListener('mousedown', this.onMouseDown.bind(this), false);
  window.addEventListener('mouseup', this.onMouseUp.bind(this), false);
  window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
}

//*************************************************************
//  Function:
//      drawing.onMouseDown
//
//	Parameters:
//		event - the mouse event
//
//  Description:
//      Toggles mouseDown bool to true
//*************************************************************
drawing.prototype.onMouseDown = function(event) {
  if(event.target.nodeName == 'CANVAS')
    this.mouseDown = true;
}

//*************************************************************
//  Function:
//      drawing.onMouseUp
//
//	Parameters:
//		event - the mouse event
//
//  Description:
//      Converts most recent draw to an object and passes it to
// 		the ObjectManager
//*************************************************************
drawing.prototype.onMouseUp = function(event) {
  this.mouseDown = false;

  if(this.drawing) {
    this.drawing = false;

    // Calculate width and height of the bounding volume
    var w = this.drawMax.x - this.drawMin.x;
    var h = this.drawMax.y - this.drawMin.y;

    this.convertDrawToObject();

    // Set start/last positions to default values
    this.startPosition.x = -1; this.startPosition.y = -1;
    this.lastPosition.x = -1; this.lastPosition.y = -1;
    this.currentStroke = [];
  }
}

//*************************************************************
//  Function:
//      drawing.onMouseMove
//
//	Parameters:
//		event - the mouse event
//
//  Description:
//      The main logic behind how line segments are calculated
//*************************************************************
drawing.prototype.onMouseMove = function(event) {
  if(this.mouseDown && Driftwood.mode == MODE_DRAW) {
    // Get startPosition x and y corrdinates
    var startX = this.lastPosition.x == -1 ? event.offsetX : this.lastPosition.x;
    var startY = this.lastPosition.y == -1 ? event.offsetY : this.lastPosition.y;
  
    this.startPosition.x = this.startPosition.x == -1 ? event.offsetX : this.startPosition.x;
    this.startPosition.y = this.startPosition.y == -1 ? event.offsetY : this.startPosition.y;

    // Create the start and end points of the line segment
    var lineStart = {x: startX, y: startY};
    var lineEnd = {x: event.offsetX, y: event.offsetY};

    // Calculate the drawMin and drawMax to be used as coordinates for AABB bounding volumes
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

    // Create a drawData object to hold color, width, start and end of the line segement
    var drawData = {
      color: 'black',
      width: 5,
      start: lineStart,
      end: lineEnd
    };

    // Draw and update currentStroke and lastPosition
    this.draw(drawData, false);
    this.currentStroke.push(drawData);
    this.lastPosition = lineEnd;
  }
}

//*************************************************************
//  Function:
//      drawing.draw
//
//	Parameters:
//		drawData - an object containing a start and end point, color 
//		and width of the line segment to draw
//
//  Description:
//      Sends the draw data to the current layer's canvas context
//		to render to the screen
//*************************************************************
drawing.prototype.draw = function(drawData, remote) {
  CanvasManager.currentContext.beginPath();
  CanvasManager.currentContext.moveTo(drawData.start.x, drawData.start.y);
  CanvasManager.currentContext.lineTo(drawData.end.x, drawData.end.y);
  CanvasManager.currentContext.lineCap = 'round';
  CanvasManager.currentContext.lineWidth = drawData.width;
  CanvasManager.currentContext.strokeStyle = drawData.color;
  CanvasManager.currentContext.stroke();
  this.drawing = true;

  if(!remote) {
    Socket.emit('draw', drawData, RoomID, CallerID);
  }
}

//*************************************************************
//  Function:
//      drawing.redraw
//
//	Parameters:
//		drawData - an object containing a start and end point, color 
//		and width of the line segment to draw
//
//  Description:
//      The same thing as drawing.draw, but does not beginPath
// 		of stroke to save computations when redrawing strokes
//*************************************************************
drawing.prototype.redraw = function(drawData) {
  CanvasManager.currentContext.moveTo(drawData.start.x, drawData.start.y);
  CanvasManager.currentContext.lineTo(drawData.end.x, drawData.end.y);
  CanvasManager.currentContext.lineCap = 'round';
  CanvasManager.currentContext.lineWidth = drawData.width;
  CanvasManager.currentContext.strokeStyle = drawData.color;
  this.drawing = true;
}

//*************************************************************
//  Function:
//      drawing.convertDrawToObject
//
//  Description:
//      Converts the array of line segments in currentStroke into
//  	an object.
//*************************************************************
drawing.prototype.convertDrawToObject = function() {
  var obj = new object("stroke");
  obj.initialize();
  obj.createStrokeObject(this.drawMin, this.drawMax, false);
  ObjectManager.addObject(obj);
}
