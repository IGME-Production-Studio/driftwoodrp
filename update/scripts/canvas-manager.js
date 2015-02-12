//*************************************************************
//  Filename: canvas-manager.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

function canvasManager() {
  console.log("Canvas Manager Created");
  this.canvas = document.createElement('canvas');
  document.body.appendChild(this.canvas);
  this.context = this.canvas.getContext('2d');
}

canvasManager.prototype.initialize = function() {
  console.log("Canvas Manager Initialized");
  CanvasManager.resize();
}

canvasManager.prototype.resize = function() {
	CanvasManager.canvas.width = $(document).width();
  	CanvasManager.canvas.height = $(document).height();
}