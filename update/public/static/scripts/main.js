//*************************************************************
//  Filename: main.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

// Objects to be used globally
var Driftwood;

var Container;

var CallerID;
var RoomID;

var CanvasManager;
var Chat;
var Commands;
var Drawing;
var FileIO;
var Grid;
var ObjectManager;
var Settings;
var Tools;
var User;

// Loop-related variables
var FPS = 60;
var GameLoop;

//*************************************************************
//  Function:
//      $(document).ready
//
//  Description:
//      Sets up game loop and all objects
//*************************************************************
$(document).ready(function() {
  construct();
  initialize();

  GameLoop = setInterval(update, 1000 / FPS);
});

//*************************************************************
//  Function:
//      contruct
//
//  Description:
//      Creates every global object for use
//*************************************************************
function construct() {
  CallerID = new Date().getTime();
  RoomID = "default";
  Container = document.getElementById('grapharea');
  console.log(Container);

  Driftwood = new driftwood();

  CanvasManager = new canvasManager();
  Chat = new chat();
  Commands = new commands();
  Drawing = new drawing();
  FileIO = new fileIO();
  Grid = new grid();
  ObjectManager = new objectManager();
  Settings = new settings();
  Tools = new tools();
  User = new user();
}

//*************************************************************
//  Function:
//      initialize
//
//  Description:
//      Initializes every global object for use
//*************************************************************
function initialize() {
  addSocketListeners();

  Driftwood.initialize();
  Grid.initialize(50);
  CanvasManager.initialize();
  Chat.initialize();
  Commands.initialize();
  Drawing.initialize();
  FileIO.initialize();
  ObjectManager.initialize();
  Settings.initialize();
  Tools.initialize();
  User.initialize();

  Socket.emit('sync objects', RoomID, CallerID);
}

//*************************************************************
//  Function:
//      update
//
//  Description:
//      The update loop called by the game loop per FPS
//*************************************************************
function update() {

}
