//*************************************************************
//  Filename: object-manager.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

function objectManager() {
  console.log("Object Manager Created");
  
  this.initialize();
}

objectManager.prototype.initialize = function() {
  console.log("Object Manager Initialized");
}