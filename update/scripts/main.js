//*************************************************************
//  Filename: main.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

var Driftwood;

var Socket;

var CanvasManager;
var Chat;
var Commands;
var FileIO;
var ObjectManager;
var Settings;
var Tools;
var User;

$(document).ready(function() {
  construct();
  initialize();
});

function construct() {
  // For later
  //Socket = new io();

  Driftwood = new driftwood();

  CanvasManager = new canvasManager();
  Chat = new chat();
  Commands = new commands();
  FileIO = new fileIO();
  ObjectManager = new objectManager();
  Settings = new settings();
  Tools = new tools();
  User = new user();
}

function initialize() {
  Driftwood.initialize();

  CanvasManager.initialize();
  Chat.initialize();
  Commands.initialize();
  FileIO.initialize();
  ObjectManager.initialize();
  Settings.initialize();
  Tools.initialize();
  User.initialize();
}