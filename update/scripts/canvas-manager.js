//*************************************************************
//  Filename: canvas-manager.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

function canvasManager() 
{
  this.canvas = document.createElement('canvas');
  document.body.appendChild(this.canvas);
  $(this.canvas).css({'position':'absolute'});
  this.context = this.canvas.getContext('2d');
}

canvasManager.prototype.initialize = function() 
{
  this.resize();
  this.addEventListeners();
}

canvasManager.prototype.addEventListeners = function()
{
  window.addEventListener('resize', this.resize.bind(this), false);
}

canvasManager.prototype.resize = function() 
{
	this.canvas.width = $(document).width() - 25;
  this.canvas.height = $(document).height() - 25;

  this.render();
}

canvasManager.prototype.render = function() 
{
	this.canvas.width = this.canvas.width;
	ObjectManager.render();
}