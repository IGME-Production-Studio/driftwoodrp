//*************************************************************
//  Filename: tools.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

function tools() {
  //console.log("Tools Object Created");
}

tools.prototype.initialize = function() {
  //console.log("Tools Initialized");
  this.addEventListeners();
}

tools.prototype.addEventListeners = function() {
  Container.addEventListener('dragenter', this.dragEnter.bind(this), false);
  Container.addEventListener('dragleave', this.dragLeave.bind(this), false);
  Container.addEventListener('dragstart', this.dragStart, false);
  Container.addEventListener('dragover', this.dragOver.bind(this), false);
}

tools.prototype.dragEnter = function(event) {
  event.preventDefault();
  $(Container).addClass('over');
  console.log('over');
}

tools.prototype.dragLeave = function(event) {
  event.preventDefault();
  $(Container).removeClass('over');
  console.log('and out');
}

tools.prototype.dragOver = function(event) {
  if(event.preventDefault) {
    event.preventDefault();
  }

  e.dataTransfer.dropEffect = 'move';
  return false;
}

tools.prototype.dragStart = function(event) {
 this.style.opacity = '0.4';
}
