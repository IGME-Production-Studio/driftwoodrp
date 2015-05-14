//*************************************************************
//  Filename: object-manager.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

//*************************************************************
//  Function:
//      objectManager
//
//  Description:
//      Creates a prototype object to manage the objects
//*************************************************************
function objectManager() {
  this.dragTargets = [];
  this.objects = [];
}

//*************************************************************
//  Function:
//      objectManager.initialize
//
//  Description:
//      Adds event listeners to the object manager
//*************************************************************
objectManager.prototype.initialize = function() {
  this.addEventListeners();
}

//*************************************************************
//  Function:
//      objectManager.addEventListeners
//
//  Description:
//      Adds event listeners to the object manager
//*************************************************************
objectManager.prototype.addEventListeners = function() {
  window.addEventListener('mousedown', this.checkAABBs.bind(this), false);
  window.addEventListener('mouseup', this.releaseTargets.bind(this), false);
  window.addEventListener('mousemove', this.moveTargets.bind(this), false);
}

//*************************************************************
//  Function:
//      objectManager
//
//	Parameters:
//		object - the object to add to the object manager
//
//  Description:
//      Adds an object to the array of objects 
//*************************************************************
objectManager.prototype.addObject = function(object) {
  this.objects.push(object);
}

//*************************************************************
//  Function:
//      objectManager.checkAABBs
//
//	Parameters:
//		event - the mouse event
//
//  Description:
//      Checks if an AABB has been clicked
//*************************************************************
objectManager.prototype.checkAABBs = function(event) {
  if(Driftwood.mode == MODE_MOVE) {
    $.each(this.objects, function(key, val) {
      // Any object that was clicked within the AABB is added to dragTargets
      var result = val.checkAABB(event.offsetX, event.offsetY);
      if(result) {
        this.dragTargets.push(val);
      }
    }.bind(this), false);
  }	
}

//*************************************************************
//  Function:
//      objectManager.moveTargets
//
//	Parameters:
//		event - the mouse event
//
//  Description:
//      Move all the targets added to dragTargets
//*************************************************************
objectManager.prototype.moveTargets = function(event) {
  if(Driftwood.mode == MODE_MOVE) {
    for(var i = 0; i < this.dragTargets.length; i++) {
      this.dragTargets[i].move({x: event.offsetX, y: event.offsetY});
    }
  }
}

//*************************************************************
//  Function:
//      objectManager.releaseTargets
//
//	Parameters:
//		event - the mouse event
//
//  Description:
//      Empties the dragTargets array
//*************************************************************
objectManager.prototype.releaseTargets = function(event) {
  if(Driftwood.mode == MODE_MOVE) {
    for(var i = 0; i < this.dragTargets.length; i++) {
      console.log(this.dragTargets[i].objectData);
      Socket.emit('move object', this.dragTargets[i].objectData, RoomID, CallerID);
    }
    this.dragTargets = [];
  }
}

//*************************************************************
//  Function:
//      objectManager.render
//
//	Parameters:
//		targetLayer - the layer to render objects from
//
//  Description:
//      Only renders objects drawn onto the target layer
//*************************************************************
objectManager.prototype.render = function(targetLayer) {
  for(var i = 0; i < this.objects.length; i++) {
    if(this.objects[i].layer == targetLayer)
    {
      this.objects[i].render();
    }
  }
}

objectManager.prototype.findStroke = function(objectID, index) {
  for(var i = 0; i < this.objects.length; i++) {
    if(this.objects[i].objectID == objectID)
      return this.objects[i];
  }
  return null;
}
