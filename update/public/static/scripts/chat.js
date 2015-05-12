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


chat.prototype.addEventListeners = function()
{
	Socket.on('receiveMessage', this.doReceiveMessage(data));
};

// Comes in the format message/roomID/caller
chat.prototype.doReceiveMessage = function(data)
{
	// if(roomID == this.roomID) // pseudocode for now
	// add chat to chat thingy
}