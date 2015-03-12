//*************************************************************
//  Filename: canvas-manager.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

function canvasManager() 
{
  /*this.canvas = document.createElement('canvas');
  $(this.canvas).addClass("absolute");
  document.body.appendChild(this.canvas);
  this.context = this.canvas.getContext('2d');*/
}

canvasManager.prototype.initialize = function() 
{
  var mapLayer = new layer();
  mapLayer.initialize("map");
  var gmLayer = new layer();
  gmLayer.initialize("gm");
  var objLayer = new layer();
  objLayer.initialize("object");

  this.layers = [mapLayer, objLayer, gmLayer];
  this.layerNames = [mapLayer.name, objLayer.name, gmLayer.name];

  this.currentLayer = this.layers[2].name;
  this.currentCanvas = this.layers[2].canvas;
  this.currentContext = this.layers[2].context;
  console.log(this.layers);

  this.resize();
  this.addEventListeners();
}

canvasManager.prototype.addEventListeners = function()
{
  window.addEventListener('resize', this.resize.bind(this), false);
}

canvasManager.prototype.resize = function() 
{
  for(var i = 0; i < this.layers.length; i++) 
  {
  	this.layers[i].resize();
  }
}

canvasManager.prototype.render = function() 
{
	for(var i = 0; i < this.layers.length; i++) 
  {
    this.layers[i].render();
  }
}

canvasManager.prototype.changeLayer = function(targetLayer) 
{
  var index = arrayContains(this.layerNames, targetLayer);
  if(index > -1)
  {
    console.log("change to " + targetLayer);

    this.currentLayer = this.layers[index].name;
    this.currentCanvas = this.layers[index].canvas;
    this.currentContext = this.layers[index].context;

    console.log(this.currentLayer);
    document.getElementById('layer-selected').innerHTML = "Current Layer: " + targetLayer;
  }
}