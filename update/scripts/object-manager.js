//*************************************************************
//  Filename: object-manager.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

function objectManager() {
  console.log("Object Manager Created");

  this.objects = [];
}

objectManager.prototype.initialize = function() {
  console.log("Object Manager Initialized");
  this.addEventListeners();
}

objectManager.prototype.addEventListeners = function() {
	window.addEventListener('click', this.checkAABBs.bind(this), false);
}

objectManager.prototype.addObject = function(object) {
	this.objects.push(object);
}

objectManager.prototype.checkAABBs = function(event) {
	$.each(this.objects, function(key, val) {
		val.checkAABB(event.offsetX, event.offsetY);
	});
}