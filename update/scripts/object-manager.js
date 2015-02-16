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
}

objectManager.prototype.addObject = function(object) {
	this.objects.push(object);
}