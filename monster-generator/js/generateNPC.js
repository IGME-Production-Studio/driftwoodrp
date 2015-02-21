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
	
	//calls the imageManipulation function from another js file
	imageManipulation();
}

//generates the NPC
function generate()
{
	document.getElementById("generateButton").onclick = function()
	{
		console.log(npc);
	};
}