//*************************************************************
//  Filename: object.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

//*************************************************************
//  Function:
//      object
//
//	Parameters:
//		type - the type of object being created
//
//  Description:
//      Creates a prototype object based on the type entered
//*************************************************************
function object(type) 
{
  // Forward declairing variables
  this.type = type;
  this.layer = CanvasManager.currentLayer;

  this.min = {x: 0, y: 0};
  this.max = {x: 0, y: 0};

  this.imageData = "";
  
  this.container = document.createElement('div');

  this.objectID = -1;

  this.objectData = {};

  this.moving = false;

  this.selected = false;
}

//*************************************************************
//  Function:
//      object.initialize
//
//  Description:
//      
//*************************************************************
object.prototype.initialize = function() 
{
  // Sets basic properties for the container
  // Containers not added to the main Container until populated
  $(this.container).css({
    'position': 'absolute',
    'z-index': -1
  });

  this.addEventListeners();
}

object.prototype.addEventListeners = function()
{
  this.container.addEventListener('mousedown', this.onMouseDown.bind(this), false);
  this.container.addEventListener('mouseup', this.onMouseUp.bind(this), false);
  this.container.addEventListener('click', this.onClick.bind(this), false);
}

object.prototype.onClick = function(event)
{
  if(Driftwood.mode == MODE_MOVE && this.layer == CanvasManager.currentLayer && !this.moving)
  {
    if(this.selected)
    {
      this.selected = false;
      $(this.container).css({
        'border': '2px solid black'
      });
    }
    else
    {
      this.selected = true;
      $(this.container).css({
        'border': '4px solid red'
      });
    }
  }
}

object.prototype.onMouseDown = function(event) 
{
  if(Driftwood.mode == MODE_MOVE && this.layer == CanvasManager.currentLayer)
  {
    console.log('move');
    this.moving = true;
  }
}

object.prototype.onMouseUp = function(event)
{
  if(this.moving) 
  {
    this.moving = false;
    console.log(this.container);
    var position = {
      x:  $(this.container).position().left,
      y:  $(this.container).position().top,
    }
    console.log(position);

    this.move(position, false);  
  }
}

//*************************************************************
//  Function:
//      object.createStrokeObject
//
//	Parameters:
//		min - the minimum point of the bounding volume
//		max - the maximum point of the bounding volume
//		remote - if the call is from a remote source
//
//  Description:
//      Creates an object based on stroke data
//*************************************************************
object.prototype.createStrokeObject = function(min, max, remote) 
{
  this.min = jQuery.extend(true, {}, min);
  this.max = jQuery.extend(true, {}, max);

  this.objectID = new Date().getTime();

  this.type = "stroke";

  this.convertStrokesToImg();

  this.objectData = {
    imageData: this.imageData,
    max: this.max,
    min: this.min,
    layer: this.layer,
    objectID: this.objectID,
    objectType: this.type
  };

  if(!remote)
    Socket.emit('add object', this.objectData, RoomID, CallerID);
}

//*************************************************************
//  Function:
//      object.createImageObject
//
//	Parameters:
//		image - the image data to bind to the object
//		min - the minimum point of the bounding volume
//		max - the maximum point of the bounding volume
//		remote - if the call is from a remote source
//
//  Description:
//      Creates an object based on stroke data
//*************************************************************
object.prototype.createImageObject = function(image, min, max, remote) 
{
  this.imageData = image;

  this.min = jQuery.extend(true, {}, min);
  this.max = jQuery.extend(true, {}, max);

  this.objectID = new Date().getTime();

  this.type = "image";

  this.objectData = {
    imageData: this.imageData,
    layer: this.layer,
    max: this.max,
    min: this.min,
    objectID: this.objectID,
    objectType: this.type
  };

  this.createImage();

  if(!remote)
    Socket.emit('add object', this.objectData, RoomID, CallerID);
}

object.prototype.convertStrokesToImg = function() {
  var data = CanvasManager.currentContext.getImageData(this.min.x-2, this.min.y-2, this.max.x+2, this.max.y+2);

  var w = (this.max.x+2) - (this.min.x-2);
  var h = (this.max.y+2) - (this.min.y-2);

  var tCanvas = document.createElement('canvas');
  var ctx = tCanvas.getContext('2d');
  tCanvas.width = w;
  tCanvas.height = h;
  ctx.putImageData(data, 0, 0);

  this.imageData = tCanvas.toDataURL();

  CanvasManager.clearCanvas();

  this.createImage();  
}

object.prototype.createImage = function() 
{
  var img = new Image();
  img.src = this.imageData;
  img.width = (this.max.x+2) - (this.min.x-2);
  img.height = (this.max.y+2) - (this.min.y-2);

  $(this.container).css({
    top: this.min.y - 2,
    left: this.min.x - 2
  });

  $(this.container).draggable();
 
  this.container.appendChild(img);
  Container.appendChild(this.container);
}

object.prototype.drawMode = function() {
  $(this.container).css({
    'z-index': -1,
    'border': '0px',
    'resize': 'none'
  });

  this.selected = false;
}

object.prototype.moveMode = function() 
{
  $(this.container).css({
    'z-index': 2,
    'border': '2px solid black',
    'resize': 'both'
  });
}

//*************************************************************
//  Function:
//      object.checkAABB
//
//	Parameters:
//		x - the x coordinate of the point
//		y - the y coordinate of the point
//
//  Description:
//      Determines if the point specified is within the AABB
//*************************************************************
object.prototype.checkAABB = function(x, y) {
  if((x > this.min.x && x < this.max.x) && (y > this.min.y && y < this.max.y)) 
  {
    return true;
  }
}

//*************************************************************
//  Function:
//      object.move
//
//	Parameters:
//		newPos - the new position to move the object to
//
//  Description:
//      Moves the object to the new position
//*************************************************************
object.prototype.move = function(newPos, remote) 
{
  var dx = newPos.x - this.min.x;
  var dy = newPos.y - this.min.y;
  console.log(dx);

  this.min.x += dx;
  this.min.y += dy;
  this.max.x += dx;
  this.max.y += dy;

  if(!remote)
    Socket.emit('move object', this.objectData, RoomID, CallerID); 

  ObjectManager.moveSelected(dx, dy, this.objectID, remote);

  // Render the canvas
  // TODO: RENDER EACH LAYER SEPERATELY TO OPTIMIZE
  //CanvasManager.render();

  // Draw bounding volume
  if(Driftwood.displayBoundVolumes)
  {
    this.renderBoundingOutline();
  }
}

object.prototype.moveByDistance = function(dx, dy, remote)
{ 
  this.min.x += dx;
  this.min.y += dy;
  this.max.x += dx;
  this.max.y += dy;

  $(this.container).css({
   top: this.min.y - 2,
   left: this.min.x - 2
  });

  if(!remote)
    Socket.emit('move object', this.objectData, RoomID, CallerID); 
}

object.prototype.moveStrokes = function(dx, dy) 
{
  /*for(var i = 0; i < this.strokes.length; i++) 
  {
    this.strokes[i].start.x += dx;
    this.strokes[i].start.y += dy;
    this.strokes[i].end.x += dx;
    this.strokes[i].end.y += dy;
  }*/
}

//*************************************************************
//  Function:
//      object.render
//
//  Description:
//      Renders the line segments of the object
//*************************************************************
object.prototype.render = function() 
{
  if(Driftwood.mode == MODE_MOVE) {
    this.renderBoundingOutline();
  } 
}

object.prototype.renderStrokes = function() {
  CanvasManager.currentContext.beginPath();
  for(var i = 1; i < this.strokes.length - 1; i++) 
  {
    if((this.strokes[i].start.x != -1 && this.strokes[i].start.y != -1 && this.strokes[i].end.x != -1 && this.strokes[i].end.y != -1)) 
    {
      Drawing.redraw(this.strokes[i]);
    }
  }
  CanvasManager.currentContext.stroke();
}

object.prototype.renderImage = function() {
  
}

//*************************************************************
//  Function:
//      object.renderBoundingOutline
//
//  Description:
//      Draws a transparent rectangle around the object to 
//		visualize the bounding volume
//*************************************************************
object.prototype.renderBoundingOutline = function()
{
  var w = this.max.x - this.min.x;
  var h = this.max.y - this.min.y;
  CanvasManager.currentContext.strokeStyle = 'rgba(100,100,100,0.5)';
  CanvasManager.currentContext.lineWidth = 2;
  CanvasManager.currentContext.rect(this.min.x, this.min.y, w, h);
  CanvasManager.currentContext.stroke();
}

object.prototype.callDelete = function()
{
  Socket.emit('delete object', this.objectData, RoomID, CallerID);
}
