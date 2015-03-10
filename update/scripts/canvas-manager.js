//*************************************************************
//  Filename: canvas-manager.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

function canvasManager() 
{
  //console.log("Canvas Manager Created");
  this.canvas = document.createElement('canvas');
  document.body.appendChild(this.canvas);
  $(this.canvas).css({'position':'absolute'});
  this.context = this.canvas.getContext('2d');
}

canvasManager.prototype.initialize = function() 
{
  //console.log("Canvas Manager Initialized");
  
  this.resize();
}

canvasManager.prototype.resize = function() 
{
	this.canvas.width = $(document).width() - 25;
  this.canvas.height = $(document).height() - 25;
}

canvasManager.prototype.render = function() 
{
	this.canvas.width = this.canvas.width;
	ObjectManager.render();
}