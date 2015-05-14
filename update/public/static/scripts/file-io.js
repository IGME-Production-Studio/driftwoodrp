//*************************************************************
//  Filename: io.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

function fileIO() {
  //console.log("File IO Object Created");
}

fileIO.prototype.initialize = function() {
  //console.log("File IO Initialized");
}

fileIO.prototype.uploadImage = function() {
  var file = document.getElementById('image-upload').files[0];
  if(!file)
    return;

  document.getElementById('image-upload').value = '';

  var reader = new FileReader();
  reader.onload = function(e) { 
    var obj = new object("image");
    obj.initialize();
    obj.createImageObject(e.target.result, {x:0, y:0}, {x:300, y:300}, false);
    ObjectManager.addObject(obj);
  };
  reader.readAsDataURL(file);
}
