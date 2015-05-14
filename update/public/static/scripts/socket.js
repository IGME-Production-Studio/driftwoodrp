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
    }
  });

  Socket.on('move object', function(object, room, caller) {
    if(CallerID != caller && RoomID == room) {
      var targetStroke = ObjectManager.findStroke(object.objectID);
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

  Socket.on('clear objects', function(room, caller) {
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
}

function createStroke(stroke) {
  console.log(stroke);
  var obj = new object("stroke");
  obj.initialize();
  
  obj.strokes = stroke.strokes;
  obj.min = stroke.min;
  obj.max = stroke.max;
  obj.start = stroke.start;
  obj.objectID = stroke.objectID;
  obj.layer = stroke.layer;
  obj.type = "stroke";

  obj.objectData = {
    strokes: obj.strokes,
    min: obj.min,
    max: obj.max,
    start: obj.start,
    layer: obj.layer,
    objectID: obj.objectID,
    objectType: obj.type,
    imageData: obj.imageData
  };

  ObjectManager.addObject(obj);
}
