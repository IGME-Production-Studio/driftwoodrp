//*************************************************************
//  Filename: object-manager.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

function objectManager() {
  this.dragTargets = [];
  this.objects = [];
}

objectManager.prototype.initialize = function() {
  this.addEventListeners();
}

objectManager.prototype.addEventListeners = function() {
	window.addEventListener('mousedown', this.checkAABBs.bind(this), false);
	window.addEventListener('mouseup', this.releaseTargets.bind(this), false);
	window.addEventListener('mousemove', this.moveTargets.bind(this), false);
}

objectManager.prototype.addObject = function(object) {
	this.objects.push(object);
}

objectManager.prototype.checkAABBs = function(event) {
	if(Driftwood.mode == MODE_MOVE) {
		$.each(this.objects, function(key, val) {
			var result = val.checkAABB(event.offsetX, event.offsetY);
			if(result) {
				this.dragTargets.push(val);
			}
		}.bind(this), false);
	}	
}

objectManager.prototype.moveTargets = function(event) {
	if(Driftwood.mode == MODE_MOVE) {
		for(var i = 0; i < this.dragTargets.length; i++) {
			this.dragTargets[i].move({x: event.offsetX, y: event.offsetY});
		}
	}
}

objectManager.prototype.releaseTargets = function(event) {
	if(Driftwood.mode == MODE_MOVE) {
		this.dragTargets = [];
	}
}

objectManager.prototype.render = function(targetLayer) {
	for(var i = 0; i < this.objects.length; i++) {
		if(this.objects[i].layer == targetLayer)
		{
			this.objects[i].render();
		}
	}
}