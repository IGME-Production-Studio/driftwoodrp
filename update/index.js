var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

var VERSION = '0014';
var PORT = 3000;

mongoose.connect('mongodb://localhost/driftwoodrp-' + VERSION);

var Schema = mongoose.Schema;

var objectSchema = new Schema({
  imageData: String,
  layer: String,
  max: {x: Number, y: Number},
  min: {x: Number, y: Number},
  objectID: Number,
  objectType: String,
  room: String
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
      imageData: object.imageData,
      layer: object.layer,
      max: object.max,
      min: object.min,
      objectID: object.objectID,
      objectType: object.type,
      room: roomID
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
        data.imageData = data.imageData,
        data.layer = data.layer,
        data.max = object.max,
        data.min = object.min,
        data.objectID = data.objectID,
        data.objectType = data.objectType,
        data.room = data.room

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
