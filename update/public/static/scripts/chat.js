//*************************************************************
//  Filename: chat.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

function chat() {
  //console.log("Chat Object Created");
}

chat.prototype.initialize = function() {
  console.log("Chat Initialized");
}

chat.prototype.sendMessage = function(msg){
	 Socket.emit('sendMessage', msg, RoomID, CallerID);
}