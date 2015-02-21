//NPC generator

//NPC base statistics
var npc;
var name, challenge, type, size, alignment, movement;

function generateStarterEnemy(){
	//NPC class
	npc = {
		name: "undefined",
		challenge: "undefined",
		type: "undefined",
		size: "Tiny",
		alignment: "Unaligned",
		movement: "Burrow"
	}
	
	//logs the starter NPC
	console.log(npc);
	
	//checks changes to any values
	checkForChange();
	generate();
};

//checks changes from each of the entry fields
function checkForChange()
{
	//when size changes, update the size of the NPC
	document.getElementById("sizeStatInput").onchange = function()
	{
		npc.size = document.getElementById("sizeStatInput").value;
		console.log("New Size is " + npc.size);
	};
	
	//when alignment changes, update the alignment of the NPC
	document.getElementById("alignmentStatInput").onchange = function()
	{
		npc.alignment = document.getElementById("alignmentStatInput").value;
		console.log("New Alignment is " + npc.alignment);
	};
	
	//when movement changes, update the movement of the NPC
	document.getElementById("movementStatInput").onchange = function()
	{
		npc.movement = document.getElementById("movementStatInput").value;
		console.log("New Movement is " + npc.movement);
	};
	
	//when name changes, update the name of the NPC
	document.getElementById("nameStatInput").onchange = function()
	{
		npc.name = document.getElementById("nameStatInput").value;
		console.log("New Name is " + npc.name);
	};
	
	//when challenge changes, update the challenge of the NPC
	document.getElementById("challengeStatInput").onchange = function()
	{
		npc.challenge = document.getElementById("challengeStatInput").value;
		console.log("New Challenge is " + npc.challenge);
	};
	
	//when type changes, update the type of the NPC
	document.getElementById("typeStatInput").onchange = function()
	{
		npc.type = document.getElementById("typeStatInput").value;
		console.log("New Type is " + npc.type);
	};
	
	/*document.getElementById("fileEdit").onchange = function()
	{
		console.log("image changed");
		previewFile();
	};*/
	
	imageManipulation();
}
/*
//file to upload image temporarily on page
//currently not working
function previewFile()
{
	var preview = document.querySelector('tempPicture');
	var file = document.querySelector('input[type=file]').files[0];
	var reader = new FileReader();
	//reader doesn't load... why?
	console.log(reader);
	reader.onloaded = function()
	{
		console.log(preview.src);
		console.log(reader.result);
		preview.src = reader.result;
	}
	
	if(file)
	{
		reader.readAsDataURL(file);
	}
	else
	{
		preview.src = "";
	}
}*/

function imageHandler(e2)
{
	var store = document.getElementById('imgstore');
	store.innerHTML='<img src="' + e2.target.result + '" height = 187 width = 280>';
}

function loadimage(e1)
{
	var filename = e1.target.files[0];
	var fr = new FileReader();
	fr.onload = imageHandler;
	fr.readAsDataURL(filename);
}

function imageManipulation()
{
	var y = document.getElementById("getimage");
	y.addEventListener('change',loadimage, false);
}

//generates the NPC
function generate()
{
	document.getElementById("generateButton").onclick = function()
	{
		console.log(npc);
	};
}