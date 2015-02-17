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
	//console.log(this);
	window.addEventListener('click', this.checkAABBs)
}

objectManager.prototype.addObject = function(object) {
	this.objects.push(object);
}

objectManager.prototype.checkAABBs = function() {
	console.log(this);
	$.each(this.objects, function(key, val) {
		console.log(val);
	});
}