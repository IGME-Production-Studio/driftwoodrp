//*************************************************************
//  Filename: socket.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

var Socket;

function addSocketListeners() {
  Socket = new io();

  Socket.on('sync strokes', function(strokes, room, caller) {
    if(CallerID == caller) {
      $.each(strokes, function(key, stroke) {
        createStroke(stroke);
      });
      CanvasManager.render();
    }
  });

  Socket.on('add stroke', function(stroke, room, caller) {
    if(CallerID != caller && RoomID == room) {
      createStroke(stroke);
    }
  });

  Socket.on('move stroke', function(stroke, room, caller) {
    if(CallerID != caller && RoomID == room) {
      var targetStroke = ObjectManager.findStroke(stroke.strokeID);
      console.log(targetStroke);
      if(targetStroke != null) {
        targetStroke.strokes = stroke.strokes;
        targetStroke.min = stroke.min;
        targetStroke.max = stroke.max;
        targetStroke.start = stroke.start;
	CanvasManager.render();
      }
    }
  });

  Socket.on('clear strokes', function(room, caller) {
    console.log('clear');
    if(CallerID != caller && RoomID == room) {
      ObjectManager.objects = [];
      CanvasManager.render();
    }
  });

  Socket.on('draw', function(drawData, room, caller) {
    if(CallerID != caller && RoomID == room) {
      Drawing.draw(drawData, true);
    }
  });

  // ======== Chat =============/
  // Comes in the format message/roomID/caller
  
  // if(roomID == this.roomID) // pseudocode for now
  // add chat to chat thingy
  Socket.on('receiveMessage', function(message, room, caller)
  {
    if ( RoomID == room )
    {
      // Proceed
      Chat.write(message, caller);
    }
  });
}



function createStroke(stroke) {
  var obj = new object("stroke");
  obj.initialize();
  
  obj.strokes = stroke.strokes;
  obj.min = stroke.min;
  obj.max = stroke.max;
  obj.start = stroke.start;
  obj.strokeID = stroke.strokeID;
  obj.layer = stroke.layer;

  obj.strokeData = {
    strokes: obj.strokes,
    min: obj.min,
    max: obj.max,
    start: obj.start,
    layer: obj.layer,
    strokeID: obj.strokeID
  };

  ObjectManager.addObject(obj);
}
