//*************************************************************
//  Filename: layer.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

//*************************************************************
//  Function:
//      layer
//
//  Description:
//      Creates a prototype object and canvas for the layer
//*************************************************************
function layer() 
{
  this.canvas = document.createElement('canvas');
  $(this.canvas).addClass('absolute');
  Container.appendChild(this.canvas);
  this.context = this.canvas.getContext('2d');
}

//*************************************************************
//  Function:
//      layer.initialize
//
//  Parameters:
//    name - the name of the layer to initialize
//
//  Description:
//      Initializes the layer with the given name
//*************************************************************
layer.prototype.initialize = function(name) 
{
  this.name = name;
  this.canvas.id = name + "-layer";
  this.resize();
}

//*************************************************************
//  Function:
//      layer.resize
//
//  Description:
//      Resizes the canvas attached to the layer
//*************************************************************
layer.prototype.resize = function() 
{
  this.canvas.width = Grid.vertMax;
  this.canvas.height = Grid.horizMax;

  this.render();
}

//*************************************************************
//  Function:
//      layer.render
//
//  Description:
//      Calls to the ObjectManager to render all objects from
//    the layer
//*************************************************************
layer.prototype.render = function() 
{
	this.canvas.width = this.canvas.width;
	ObjectManager.render(this.name);
}
