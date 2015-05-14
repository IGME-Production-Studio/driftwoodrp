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
    var img = new Image();
    img.src = e.target.result;
    img.width = 300;
    img.height = 300;
    $(img).css({'position':'absolute', 'z-index': 2});
    $(img).draggable();
    Container.appendChild(img);

    
    var obj = new object("image");
    obj.initialize();
    obj.createImageObject(img.src, {x:-2, y:-2}, {x:302, y:302}, {x:-2, y:-2}, false);
    ObjectManager.addObject(obj);
  };
  reader.readAsDataURL(file);
}
