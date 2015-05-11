var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

var VERSION = '0009';
var PORT = 3000;

mongoose.connect('mongodb://localhost/driftwoodrp-' + VERSION);

var Schema = mongoose.Schema;

var campaignSchema = new Schema(
{
  name: String, /* Nickname for campaign, eg. "Acquisitions, Inc." */
  gameType: String, /* Name of the game, eg. "Pathfinder" */
  members: [Object], /* all members, including GMs */ 
  gameMasters: [Object] /* could be more than one. */
});
var campaign = Mongoose.model('Campaign', campaignSchema); 

var meetingSchema = new Schema(
{
  day: String, /*for now, just string for weekly day of week*/
  startTime: Number, /* eg. 1630 = 4:30 PM */
  endTime: Number, 
  campaign: Schema.Types.ObjectId, /* mongoose ObjectId type, for easy referencing*/
});
var meeting = Mongoose.model('Meeting', meetingSchema); 

var personSchema = new Schema({
  nickname: String, /* eg. "John" */
  username: String,  /* eg. xX_noobpwner_Xx */
  campaigns: [ Schema.Types.ObjectId ], /* campaign ID */
  friends: [ Schema.Types.ObjectId ] /* person ID */
});
var person = Mongoose.model('Person', personSchema); 


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

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendfile(__dirname, '/public/index.html');
});

io.on('connection', function(socket) {

  socket.on('sync strokes', function(roomID, caller) {
    Stroke.find({room: roomID}, function(err, data) {
      if(err) console.log(err);
      io.emit('sync strokes', data, roomID, caller);
    });
  });

  socket.on('add stroke', function(stroke, roomID, caller) {
    var s = new Stroke({
      strokes: stroke.strokes,
      min: stroke.min,
      max: stroke.max,
      start: stroke.start,
      room: roomID,
      strokeID: stroke.strokeID,
      layer: stroke.layer
    });

    s.save(function(err, s) {
      if(err) console.log(err)
      io.emit('add stroke', stroke, roomID, caller);
    });
  });

  socket.on('move stroke', function(stroke, roomID, caller) {
    Stroke.findOne({strokeID: stroke.strokeID}, function(err, data) {
      if(err) console.log(err);
      if(data) {
        data.strokes = stroke.strokes,
        data.min = stroke.min,
        data.max = stroke.max,
        data.start = stroke.start,
        data.room = data.room,
        data.strokeID = data.strokeID,
        data.layer = data.layer

        data.save(function(err, data) {
          if(err) console.log(err);
          io.emit('move stroke', data, roomID, caller);
        });
      }
    });
  });

  socket.on('clear strokes', function(roomID, caller) {
    Stroke.remove({room: roomID}, function(err) {
      if(err) console.log(err);
      io.emit('clear strokes', roomID, caller);
    });
  });

  socket.on('draw', function(drawData, roomID, caller) {
    io.emit('draw', drawData, roomID, caller);
  });
});

http.listen(PORT, function() {
  console.log("Listening on *:" + PORT);
});
