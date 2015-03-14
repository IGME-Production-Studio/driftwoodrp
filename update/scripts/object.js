//*************************************************************
//  Filename: object.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

function object(type) 
{
  this.type = type;
  this.layer = CanvasManager.currentLayer;
}

object.prototype.initialize = function() 
{
}

object.prototype.createStrokeObject = function(strokes, min, max, start) 
{
	this.strokes = strokes;
	this.min = jQuery.extend(true, {}, min);
	this.max = jQuery.extend(true, {}, max);
	this.start = jQuery.extend(true, {}, start);
}

object.prototype.checkAABB = function(x, y) {
	if((x > this.min.x && x < this.max.x) && (y > this.min.y && y < this.max.y)) 
	{
		return true;
	}
}

object.prototype.move = function(newPos) 
{
	if(this.layer == CanvasManager.currentLayer) 
	{
		var dx = newPos.x - ((this.min.x + this.max.x)/2);
		var dy = newPos.y - ((this.min.y + this.max.y)/2);

		for(var i = 0; i < this.strokes.length; i++) 
		{
			this.strokes[i].start.x += dx;
			this.strokes[i].start.y += dy;
			this.strokes[i].end.x += dx;
			this.strokes[i].end.y += dy;
		}

		this.min.x += dx;
		this.min.y += dy;
		this.max.x += dx;
		this.max.y += dy;

		CanvasManager.render();
		this.start = jQuery.extend(true, {}, newPos);

		if(Driftwood.displayBoundVolumes)
		{
			this.renderBoundingOutline();
		}
	}
}

object.prototype.render = function() 
{
	CanvasManager.currentContext.beginPath();
	for(var i = 1; i < this.strokes.length - 1; i++) 
	{
		if((this.strokes[i].start.x != -1 && this.strokes[i].start.y != -1 && this.strokes[i].end.x != -1 && this.strokes[i].end.y != -1)) 
		{
			Drawing.redraw(this.strokes[i]);
			//Drawing.draw(this.strokes[i]);
		}
	}
	CanvasManager.currentContext.stroke();
}

object.prototype.renderBoundingOutline = function()
{
	var w = this.max.x - this.min.x;
	var h = this.max.y - this.min.y;
	CanvasManager.currentContext.strokeStyle = 'rgba(100,100,100,0.5)';
	CanvasManager.currentContext.lineWidth = 2;
	CanvasManager.currentContext.rect(this.min.x, this.min.y, w, h);
	CanvasManager.currentContext.stroke();
}