//*************************************************************
//  Filename: chat.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

function chat() {
  //console.log("Chat Object Created");
}

chat.prototype.initialize = function() {

	$('#chatinput-send').click(function()
	{
		console.log("CLICKED");
		var msg = $('#chatinput-input').val();
		console.log("msg: " + msg);
		sendMessageTest(msg, '1234ABC', CallerID);
	});
	$('#chatinput-input').keydown(function(e)
	{
		if(e.keyCode == '13')
		{
			console.log("enter pressed");
			var msg = $('#chatinput-input').val();
			console.log("msg: " + msg);
			sendMessageTest(msg, '1234ABC', CallerID);
		}
	})

  console.log("Chat Initialized");
}

chat.prototype.sendMessage = function(msg){
	 Socket.emit('sendMessage', msg, RoomID, CallerID);
	 var newp = document.createElement('p'); 
	 $('#newp').addClass('chatMsg').html('[' + CallerID + ']' + ': ' + msg); 
	 $('#chatwindow').append(newp);
}
function sendMessageTest(msg, roomID,  CallerID)
{
	console.log("chat test");
	console.log(msg);
	 var newp = document.createElement('p'); 
	 var h = '[<span class="roomOwner"><strong>' + CallerID + ']</strong></span>' + ': ' + msg;
	 $(newp).addClass('chatMsg');
	 $(newp).html(h); 
	 $('#chatwindow').append(newp);
	 $('#chatinput-input').val("");
}

chat.prototype.addEventListeners = function()
{
	
};

chat.prototype.write = function(message, caller)
{
	// Front end 
	// caller [ time ] : message 
}