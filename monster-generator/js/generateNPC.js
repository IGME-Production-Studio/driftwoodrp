//*******************************************
//	NPC Generator
//
//	Filename: generateNPC.js
//
//	Authors
//	Mario Chuman	<mxc7819@g.rit.edu>
//
//*******************************************

//NPC base statistics
var npc;
var name, challenge, type, size, alignment, movement;
var npcs = [];
function generateStarterEnemy(){
	//NPC class
	npc = {
		name: "undefined",
		challenge: "undefined",
		type: "undefined",
		size: "Tiny",
		alignment: "Unaligned",
		movement: "Burrow",
		image: ""
	}
	
	//logs the starter NPC
	console.log(npc);
	
	//checks changes to any values
	checkForChange();
	
	//calls the imageManipulation function from another js file
	imageManipulation();
	
	generate();
};

//*******************************************
//	Function:
//		checkForChange
//
//	Parameters:
//		None
//
//	Return:
//		None
//
//	Description
//		checks changes from each of the entry fields
//
//*******************************************
function checkForChange()
{
	//when size changes, update the size of the NPC
	document.getElementById("sizeStatInput").onchange = function()
	{
		npc.size = document.getElementById("sizeStatInput").value;
		//console.log("New Size is " + npc.size);
	};
	
	//when alignment changes, update the alignment of the NPC
	document.getElementById("alignmentStatInput").onchange = function()
	{
		npc.alignment = document.getElementById("alignmentStatInput").value;
		//console.log("New Alignment is " + npc.alignment);
	};
	
	//when movement changes, update the movement of the NPC
	document.getElementById("movementStatInput").onchange = function()
	{
		npc.movement = document.getElementById("movementStatInput").value;
		//console.log("New Movement is " + npc.movement);
	};
	
	//when name changes, update the name of the NPC
	document.getElementById("nameStatInput").onchange = function()
	{
		npc.name = document.getElementById("nameStatInput").value;
		//console.log("New Name is " + npc.name);
	};
	
	//when challenge changes, update the challenge of the NPC
	document.getElementById("challengeStatInput").onchange = function()
	{
		npc.challenge = document.getElementById("challengeStatInput").value;
		//console.log("New Challenge is " + npc.challenge);
	};
	
	//when type changes, update the type of the NPC
	document.getElementById("typeStatInput").onchange = function()
	{
		npc.type = document.getElementById("typeStatInput").value;
		//console.log("New Type is " + npc.type);
	};
	
	document.getElementById("npcList").onchange = function()
	{
		console.log(document.getElementById("npcList").value);
	}
}

//*******************************************
//	Function:
//		generate
//
//	Parameters:
//		None
//
//	Return:
//		None
//
//	Description
//		generates the NPC
//
//*******************************************
function generate()
{
	document.getElementById("generateButton").onclick = function()
	{
		//adds to the array of NPCs
		var npcPos = npcs.length;
		console.log(npcPos);
		console.log(npc);
		npcs[npcPos] = npc;
		console.log("There are " + (npcPos+1) + " NPCs. These are the NPCS: " + npcs);
		
		//adds to the NPC List on the page
		var npcList = document.getElementById("npcList");
		var option = document.createElement("option");
		option.text = npcPos + " - " + npcs[npcPos].name;
		npcList.add(option);
	};
}