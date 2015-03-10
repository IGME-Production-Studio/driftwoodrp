//*************************************************************
//  Filename: grid.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

function grid()
{
  this.canvas = document.createElement('canvas');
  document.body.appendChild(this.canvas);
  $(this.canvas).css({'z-index':-5, 'position':'absolute'});
  this.context = this.canvas.getContext('2d');

  this.size = 100;
}

grid.prototype.initialize = function() 
{
  this.resize();
  this.addEventListeners();
}

grid.prototype.addEventListeners = function()
{
  window.addEventListener('resize', this.resize.bind(this), false);
}

grid.prototype.resize = function()
{
  this.canvas.width = $(document).width() - 25;
  this.canvas.height = $(document).height() - 25;

  this.render();
  CanvasManager.resize();
}

grid.prototype.build = function(size)
{
  this.size = size;

  var vertLines = Math.ceil(this.canvas.width/size);
  var horizLines = Math.ceil(this.canvas.height/size);

  this.vertMax = (vertLines-1)*size;
  this.horizMax = (horizLines-1)*size;

  for(var i = 0; i < vertLines; i++) 
  {
  	var start = {x:i*size, y:0};
  	var end = {x:i*size, y:this.horizMax};

  	this.drawGridLine(start, end);
  }

  for(var i = 0; i < horizLines; i++)
  {
		var start = {x:0, y:i*size};
  	var end = {x:this.vertMax, y:i*size};

  	this.drawGridLine(start, end);
  }
}

grid.prototype.drawGridLine = function(start, end)
{
  this.context.beginPath();
	this.context.moveTo(start.x, start.y);
	this.context.lineTo(end.x, end.y);
	this.context.lineCap = 'round';
	this.context.lineWidth = 2;
	this.context.strokeStyle = 'black';
	this.context.stroke();
}

grid.prototype.render = function() 
{
  this.canvas.width = this.canvas.width;

  this.build(this.size);
}