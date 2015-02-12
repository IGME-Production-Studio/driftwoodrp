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
  initialize();
});

function initialize() {
  // For later
  //Socket = new io();

  Driftwood = new Driftwood();

  CanvasManager = new CanvasManager();
  Chat = new Chat();
  Commands = new Commands();
  FileIO = new FileIO();
  ObjectManager = new ObjectManager();
  Settings = new Settings();
  Tools = new Tools();
  User = new User();
}