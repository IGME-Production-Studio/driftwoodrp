//*************************************************************
//  Filename: layer.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

function layer() 
{
  this.canvas = document.createElement('canvas');
  $(this.canvas).addClass('absolute');
  document.body.appendChild(this.canvas);
  this.context = this.canvas.getContext('2d');
}

layer.prototype.initialize = function(name) 
{
  this.name = name;
  this.canvas.id = name + "-layer";
  this.resize();
}

layer.prototype.resize = function() 
{
  this.canvas.width = Grid.vertMax;
  this.canvas.height = Grid.horizMax;

  this.render();
}

layer.prototype.render = function() 
{
	this.canvas.width = this.canvas.width;
	ObjectManager.render(this.name);
}