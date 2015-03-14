//*************************************************************
//  Filename: canvas-manager.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

//*************************************************************
//  Function:
//      canvasManager
//
//  Description:
//      Creates a prototype object for the canvas manager
//*************************************************************
function canvasManager() 
{
}

//*************************************************************
//  Function:
//      canvasManager.initialize
//
//  Description:
//      Creates layers and sets the current layer,
//      adds event listeners.
//*************************************************************
canvasManager.prototype.initialize = function() 
{
  // create and initialize the layers (map, gm, object);
  var mapLayer = new layer();
  mapLayer.initialize("map");
  var gmLayer = new layer();
  gmLayer.initialize("gm");
  var objLayer = new layer();
  objLayer.initialize("object");

  // Add layers to array, add layer names to a seperate array
  this.layers = [mapLayer, objLayer, gmLayer];
  this.layerNames = [mapLayer.name, objLayer.name, gmLayer.name];

  // Set current layer information
  this.currentLayer = this.layers[2].name;
  this.currentCanvas = this.layers[2].canvas;
  this.currentContext = this.layers[2].context;

  // Initial sizing of layer's canvases 
  this.resize();
  this.addEventListeners();
}

//*************************************************************
//  Function:
//      canvasManager.addEventListeners
//
//  Description:
//      Adds event listeners to the canvas manager
//*************************************************************
canvasManager.prototype.addEventListeners = function()
{
  window.addEventListener('resize', this.resize.bind(this), false);
}

//*************************************************************
//  Function:
//      canvasManager.resize
//
//  Description:
//      Resizes all layers within the canvas manager
//*************************************************************
canvasManager.prototype.resize = function() 
{
  for(var i = 0; i < this.layers.length; i++) 
  {
  	this.layers[i].resize();
  }
}

//*************************************************************
//  Function:
//      canvasManager.render
//
//  Description:
//      Renders all layers within the canvas manager
//*************************************************************
canvasManager.prototype.render = function() 
{
	for(var i = 0; i < this.layers.length; i++) 
  {
    this.layers[i].render();
  }
}

//*************************************************************
//  Function:
//      canvasManager.changeLayer
//
//  Parameters:
//    targetLayer - The layer to make current layer
//
//  Description:
//      Changes the current layer and updates debug text
//*************************************************************
canvasManager.prototype.changeLayer = function(targetLayer) 
{
  // Ensure the target layer exists
  var index = arrayContains(this.layerNames, targetLayer);
  if(index > -1)
  {
    // Change the current layer
    this.currentLayer = this.layers[index].name;
    this.currentCanvas = this.layers[index].canvas;
    this.currentContext = this.layers[index].context;

    // Set debug text to current layer
    document.getElementById('layer-selected').innerHTML = "Current Layer: " + targetLayer;
  }
}