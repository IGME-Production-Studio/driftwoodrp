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
}

//*************************************************************
//  Function:
//      object.createStrokeObject
//
//	Parameters:
//		min - the minimum point of the bounding volume
//		max - the maximum point of the bounding volume
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
    'border': '0px'
  });
}

object.prototype.moveMode = function() 
{
  $(this.container).css({
    'z-index': 2,
    'border': '2px solid black'
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
  if(this.layer == CanvasManager.currentLayer) 
  {
    var dx = newPos.x - ((this.min.x + this.max.x)/2);
    var dy = newPos.y - ((this.min.y + this.max.y)/2);
    console.log(dx);

    if(this.type == 'stroke') 
    {
      this.moveStrokes(dx, dy);
    }

    this.min.x += dx;
    this.min.y += dy;
    this.max.x += dx;
    this.max.y += dy;

    // Render the canvas
    // TODO: RENDER EACH LAYER SEPERATELY TO OPTIMIZE
    CanvasManager.render();
    this.start = jQuery.extend(true, {}, newPos);

    // Draw bounding volume
    if(Driftwood.displayBoundVolumes)
    {
      this.renderBoundingOutline();
    }
  }
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
