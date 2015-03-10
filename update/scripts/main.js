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
var Drawing;
var FileIO;
var Grid;
var ObjectManager;
var Settings;
var Tools;
var User;

var FPS = 60;
var GameLoop;

$(document).ready(function() {
  construct();
  initialize();

  GameLoop = setInterval(update, 1000 / FPS);
});

function construct() {
  // For later
  //Socket = new io();

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

function initialize() {
  Driftwood.initialize();
  Grid.initialize();
  CanvasManager.initialize();
  Chat.initialize();
  Commands.initialize();
  Drawing.initialize();
  FileIO.initialize();
  ObjectManager.initialize();
  Settings.initialize();
  Tools.initialize();
  User.initialize();
}

function update() {

}