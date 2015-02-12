//*************************************************************
//  Filename: object-manager.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

function ObjectManager() {
  console.log("Object Manager Created");
  
  this.initialize();
}

ObjectManager.prototype.initialize = function() {
  console.log("Object Manager Initialized");
}