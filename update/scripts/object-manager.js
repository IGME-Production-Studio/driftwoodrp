//*************************************************************
//  Filename: object-manager.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

function objectManager() {
  console.log("Object Manager Created");
  this.dragTargets = [];
  this.objects = [];
}

objectManager.prototype.initialize = function() {
  console.log("Object Manager Initialized");
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
				console.log(this);
				this.dragTargets.push(val);
			}
		}.bind(this), false);
		console.log(this.dragTargets);
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

objectManager.prototype.render = function() {
	for(var i = 0; i < this.objects.length; i++) {
		this.objects[i].render();
	}
}