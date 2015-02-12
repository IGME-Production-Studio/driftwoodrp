//*************************************************************
//  Filename: commands.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

function Commands() {
  console.log("Commands Object Created");
  
  this.initialize();
}

Commands.prototype.initialize = function() {
  console.log("Commands Initialized");
}