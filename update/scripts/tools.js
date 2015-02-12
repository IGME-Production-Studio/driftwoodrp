//*************************************************************
//  Filename: tools.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

function Tools() {
  console.log("Tools Object Created");
  
  this.initialize();
}

Tools.prototype.initialize = function() {
  console.log("Tools Initialized");
}