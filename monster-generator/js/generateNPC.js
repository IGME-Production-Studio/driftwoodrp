//*******************************************
//	NPC Generator
//
//	Filename: generateNPC.js
//
//	Authors
//	Mario Chuman		<mxc7819@g.rit.edu>
//
//*******************************************

//NPC base statistics
var genericNPC;
var currentNPC;
var name, challenge, type, size, alignment, movement;
var npcs = [];

//*******************************************
//	Function:
//		generateStarterEnemy
//
//	Parameters:
//		None
//
//	Return:
//		None
//
//	Description:
//		Starter function, creates an empty NPC object
//
//*******************************************
function generateStarterEnemy(){
	//NPC class
	genericNPC = {
		name: "undefined",
		challenge: "undefined",
		type: "undefined",
		size: "Tiny",
		alignment: "Unaligned",
		movement: "Burrow",
		image: ""
	}
	
	//calls the imageManipulation function from another js file
	imageManipulation();
	generate();
	changeCurrentNPC();
};

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
//	Description:
//		Generates the NPC and saves it on the array
//
//*******************************************
function generate()
{
	document.getElementById("generateButton").onclick = function()
	{
		//adds to the array of NPCs
		var npcPos = npcs.length;
		
		var newNPC = {
		name: document.getElementById("nameStatInput").value,
		challenge: document.getElementById("challengeStatInput").value,
		type: document.getElementById("typeStatInput").value,
		size: document.getElementById("sizeStatInput").value,
		alignment: document.getElementById("alignmentStatInput").value,
		movement: document.getElementById("movementStatInput").value,
		image: ""
		}
		npcs.push(newNPC);
		
		//adds to the NPC List on the page
		var npcList = document.getElementById("npcList");
		var option = document.createElement("option");
		option.text = npcPos + " - " + npcs[npcPos].name;
		npcList.add(option);
		npcList.value = option.text;
	};
}

//*******************************************
//	Function:
//		changeCurrentNPC
//
//	Parameters:
//		None
//
//	Return:
//		None
//
//	Description:
//		Changes the current NPC in the back-end
//
//*******************************************
function changeCurrentNPC()
{
	document.getElementById("npcList").onchange = function()
	{
		var npcPos = document.getElementById("npcList").value.substring(0,1);
		currentNPC = npcs[npcPos];
		console.log(currentNPC);
		changeValues();
	};
}

//*******************************************
//	Function:
//		changeValues
//
//	Parameters:
//		None
//
//	Return:
//		None
//
//	Description:
//		Changes the interface boxes to reflect who the current NPC is
//
//*******************************************
function changeValues()
{
	document.getElementById("nameStatInput").value = currentNPC.name;
	document.getElementById("challengeStatInput").value = currentNPC.challenge;
	document.getElementById("typeStatInput").value = currentNPC.type;
	document.getElementById("sizeStatInput").value = currentNPC.size;
	document.getElementById("alignmentStatInput").value = currentNPC.alignment;
	document.getElementById("movementStatInput").value = currentNPC.movement;
}