//*************************************************************
//  Filename: user.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

function user() {
  console.log("User Object Created");
}

user.prototype.initialize = function() {
  console.log("User Initialized");
}