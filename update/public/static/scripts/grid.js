//*************************************************************
//  Filename: grid.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

//*************************************************************
//  Function:
//      grid
//
//  Description:
//      Creates a prototype object for the Grid system, creates
//    a canvas for the grid to draw lines to
//*************************************************************
function grid()
{
  this.canvas = document.createElement('canvas');
  $(this.canvas).addClass("absolute");
  Container.appendChild(this.canvas);
  $(this.canvas).css({'z-index':-50});
  this.context = this.canvas.getContext('2d');
}

//*************************************************************
//  Function:
//      grid.initialize
//
//  Description:
//    Adds event listeners and performs an initial resize on
//    the grid canvas
//*************************************************************
grid.prototype.initialize = function(size) 
{
  this.size = size;

  this.resize();
  this.addEventListeners();
}

//*************************************************************
//  Function:
//      grid.addEventListeners
//
//  Description:
//    Adds resize event listener to the grid
//*************************************************************
grid.prototype.addEventListeners = function()
{
  window.addEventListener('resize', this.resize.bind(this), false);
}

//*************************************************************
//  Function:
//      grid.resize
//
//  Description:
//    Resizes the grid canvas based on the window size
//*************************************************************
grid.prototype.resize = function()
{
  this.canvas.width = $(Container).width() - 25;
  this.canvas.height = $(Container).height() - 25;

  this.render();
}

//*************************************************************
//  Function:
//      grid.build
//
//  Parameters:
//    size - the size of each grid square in pixels
//
//  Description:
//    Builds the grid based on the size parameter
//*************************************************************
grid.prototype.build = function(size)
{
  this.size = size;

  // Calculates number of lines horizontal and verticle
  var vertLines = Math.ceil(this.canvas.width/size);
  var horizLines = Math.ceil(this.canvas.height/size);

  this.vertMax = (vertLines-1)*size;
  this.horizMax = (horizLines-1)*size;

  // Draw the grid
  this.context.beginPath();
  // Verticle lines
  for(var i = 0; i < vertLines; i++) 
  {
  	var start = {x:i*size, y:0};
  	var end = {x:i*size, y:this.horizMax};

  	this.drawGridLine(start, end);
  }
  // Then horizontal lines
  for(var i = 0; i < horizLines; i++)
  {
		var start = {x:0, y:i*size};
  	var end = {x:this.vertMax, y:i*size};

  	this.drawGridLine(start, end);
  }
  this.context.stroke();
}

//*************************************************************
//  Function:
//      grid.drawGridLine
//
//  Parameters:
//    start - that starting point of the grid line
//    end - the end point of the grid line
//
//  Description:
//    Draws the grid line from start to end
//*************************************************************
grid.prototype.drawGridLine = function(start, end)
{
	this.context.moveTo(start.x, start.y);
	this.context.lineTo(end.x, end.y);
	this.context.lineCap = 'round';
	this.context.lineWidth = 2;
	this.context.strokeStyle = 'black';
}

//*************************************************************
//  Function:
//      grid.render
//
//  Description:
//    Rebuilds and redraws the grid
//*************************************************************
grid.prototype.render = function() 
{
  this.canvas.width = this.canvas.width;

  this.build(this.size);
}
