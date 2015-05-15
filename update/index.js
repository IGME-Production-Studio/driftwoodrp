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

var campaignSchema = new Schema(
{
  name: String, /* Nickname for campaign, eg. "Acquisitions, Inc." */
  gameType: String, /* Name of the game, eg. "Pathfinder" */
  members: [Object], /* all members, including GMs */ 
  gameMasters: [Object] /* could be more than one. */
  reminder: Schema.Types.ObjectId /* hook to a reminder for campaign sessions (weekly) */
});
var campaign = Mongoose.model('Campaign', campaignSchema); 

var reminderSchema = new Schema(
{
  day: String, /*for now, just string for weekly day of week*/
  startTime: Number, /* eg. 1630 = 4:30 PM */
  endTime: Number, 
  campaign: Schema.Types.ObjectId, /* mongoose ObjectId type, for easy referencing*/
});
var reminder = Mongoose.model('Reminder', reminderSchema); 

// For the profile, primarily - will end up relying on old Driftwood login info
var personSchema = new Schema({
  nickname: String, /* eg. "John" */
  username: String,  /* eg. xX_noobpwner_Xx */
  campaigns: [ Schema.Types.ObjectId ], /* campaign ID */
  friends: [ Schema.Types.ObjectId ] /* person ID */
});
var person = Mongoose.model('Person', personSchema); 

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

  socket.on('delete object', function(object, roomID, caller) {
    Obj.remove({objectID: object.objectID}, function(err) {
      if(err) console.log(err);
      io.emit('delete object', object, roomID, caller);
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

  // Add campaign to the system. 
  socket.on('add campaign', function(campaignName, gameType, members, gms, caller){

  });

  // Create a new user, for the first time. For testing right now. 
  socket.on('add user', function(_username, _nickname, caller){
    var u = new Person({
      nickname: _nickname,
      username: _username, 
      campaigns: new Array(), 
      friends: new Array()
    }); 
  })

  //emit chat message to room
  socket.on('sendMessage', function(_msg, _room, caller)
  {
    socket.emit('receiveMessage', message, roomID, caller);
  });
});

http.listen(PORT, function() {
  console.log("Listening on *:" + PORT);
});