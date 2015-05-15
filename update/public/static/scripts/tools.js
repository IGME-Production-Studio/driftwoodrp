//*************************************************************
//  Filename: tools.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

function tools() {
  //console.log("Tools Object Created");
  this.target = null;
}

tools.prototype.initialize = function() {
  //console.log("Tools Initialized");
  this.addEventListeners();
}

tools.prototype.addEventListeners = function() {
  Container.addEventListener('dragenter', this.dragEnter.bind(this), false);
  Container.addEventListener('dragleave', this.dragLeave.bind(this), false);
  Container.addEventListener('dragover', this.dragOver.bind(this), false);
  Container.addEventListener('drop', this.drop.bind(this), false);
}

tools.prototype.dragEnter = function(event) {
  event.preventDefault();
  $(Container).addClass('over');
  console.log('over');
}

tools.prototype.dragLeave = function(event) {
  event.preventDefault();
  console.log('and out');
}

tools.prototype.dragOver = function(event) {
  if(event.preventDefault) {
    event.preventDefault();
  }

  event.dataTransfer.dropEffect = 'move';
  return false;
}

tools.prototype.drop = function(event) {
  //event.stopPropagation();
  $(Container).removeClass('over');
  console.log(this.target);
  var obj = new object("monster");
  obj.initialize();
  var monster = Monsters.findMonster(this.target);
  if(monster){
    obj.createMonsterObject(monster, {x:0, y:0}, {x:70, y:70}, false);
   ObjectManager.addObject(obj);
  }
  return false;
}
