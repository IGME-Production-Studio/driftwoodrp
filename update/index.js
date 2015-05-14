var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

var VERSION = '0013';
var PORT = 3000;

mongoose.connect('mongodb://localhost/driftwoodrp-' + VERSION);

var Schema = mongoose.Schema;

var strokeSchema = new Schema({
  strokes: [{
    start: {x: Number, y: Number},
    end: {x: Number, y: Number},
    color: String,
    width: Number}],
  min: {x: Number, y: Number},
  max: {x: Number, y: Number},
  start: {x: Number, y: Number},
  room: String,
  strokeID: Number,
  layer: String
});
var Stroke = mongoose.model('Stroke', strokeSchema);

var objectSchema = new Schema({
  objectType: String,
  min: {x: Number, y: Number},
  max: {x: Number, y: Number},
  start: {x: Number, y: Number},
  room: String,
  objectID: Number,
  layer: String,
  imageData: String,
  strokes: [{
    start: {x: Number, y: Number},
    end: {x: Number, y: Number},
    color: String,
    width: Number}]
});
var Obj = mongoose.model('Object', objectSchema);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendfile(__dirname, '/public/index.html');
});

io.on('connection', function(socket) {

  socket.on('sync objects', function(roomID, caller) {
    
    Obj.find({room: roomID}, function(err, data) {
      if(err) console.log(err);
      io.emit('sync objects', data, roomID, caller);
    });
  });

  socket.on('add object', function(object, roomID, caller) {
    var o = new Obj({
      objectType: object.type,
      strokes: object.strokes,
      min: object.min,
      max: object.max,
      start: object.start,
      room: roomID,
      objectID: object.objectID,
      layer: object.layer,
      imageData: object.imageData
    });

    o.save(function(err, o) {
      if(err) console.log(err)
      io.emit('add object', object, roomID, caller);
    });
  });

  socket.on('move object', function(object, roomID, caller) {
    Obj.findOne({objectID: object.objectID}, function(err, data) {
      if(err) console.log(err);
      if(data) {
        data.strokes = object.strokes,
        data.min = object.min,
        data.max = object.max,
        data.start = object.start,
        data.room = data.room,
        data.objectID = data.objectID,
        data.layer = data.layer,
        data.imageData = data.imageData,
        data.objectType = data.objectType

        data.save(function(err, data) {
          if(err) console.log(err);
          io.emit('move object', data, roomID, caller);
        });
      }
    });
  });

  socket.on('clear objects', function(roomID, caller) {
    Obj.remove({room: roomID}, function(err) {
      if(err) console.log(err);
      io.emit('clear objects', roomID, caller);
    });
  });

  socket.on('draw', function(drawData, roomID, caller) {
    io.emit('draw', drawData, roomID, caller);
  });
});

http.listen(PORT, function() {
  console.log("Listening on *:" + PORT);
});
