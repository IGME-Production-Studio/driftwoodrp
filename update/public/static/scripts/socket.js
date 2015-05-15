//*************************************************************
//  Filename: socket.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

var Socket;

function addSocketListeners() {
  Socket = new io();

  Socket.on('sync objects', function(objects, room, caller) {
    console.log(objects);
    if(CallerID == caller) {
      console.log(objects);
      $.each(objects, function(key, object) {
        createStroke(object);
      });
      CanvasManager.render();
    }
  });

  Socket.on('add object', function(object, room, caller) {
    if(CallerID != caller && RoomID == room) {
      createStroke(object);
      CanvasManager.clearCanvas();
    }
  });

  Socket.on('move object', function(object, room, caller) {
    console.log('move object');
    if(CallerID != caller && RoomID == room) {
      var targetObj = ObjectManager.findObject(object.objectID);
      console.log(targetObj);
      if(targetObj != null) {
        targetObj.max = object.max;
        targetObj.min = object.min;
        $(targetObj.container).css({
          top: targetObj.min.y,
          left: targetObj.min.x
        });
      }
    }
  });

  Socket.on('delete object', function(object, room, caller) {
    if(CallerID != caller && RoomID == room)
    {
      ObjectManager.deleteObject(object.objectID);
    }
  });

  Socket.on('clear objects', function(room, caller) {
    console.log('clear');
    if(CallerID != caller && RoomID == room) {
      CanvasManager.clear(true);
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
  console.log(stroke);
  var obj = new object("stroke");
  obj.initialize();
 
  obj.imageData = stroke.imageData; 
  obj.layer = stroke.layer;
  obj.max = stroke.max;
  obj.min = stroke.min;
  obj.objectID = stroke.objectID;
  obj.type = "stroke";

  obj.objectData = {
    imageData: obj.imageData,
    layer: obj.layer,
    max: obj.max,
    min: obj.min,
    objectID: obj.objectID,
    objectType: obj.type,
  };

  obj.createImage();

  ObjectManager.addObject(obj);
}