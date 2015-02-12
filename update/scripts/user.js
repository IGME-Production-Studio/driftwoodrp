//*************************************************************
//  Filename: user.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

function User() {
  console.log("User Object Created");
  
  this.initialize();
}

User.prototype.initialize = function() {
  console.log("User Initialized");
}