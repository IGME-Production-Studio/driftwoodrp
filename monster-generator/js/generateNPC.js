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
		console.log("Position: " + npcPos);
		
		var newNPC = {
		name: document.getElementById("nameStatInput").value,
		challenge: document.getElementById("challengeStatInput").value,
		type: document.getElementById("typeStatInput").value,
		size: document.getElementById("sizeStatInput").value,
		alignment: document.getElementById("alignmentStatInput").value,
		movement: document.getElementById("movementStatInput").value,
		image: ""
		}
		
		console.log(newNPC);
		npcs.push(newNPC);
		console.log(npcs[0].name);
		console.log("There are " + (npcPos+1) + " NPCs. These are the NPCS: " + npcs);
		
		//adds to the NPC List on the page
		var npcList = document.getElementById("npcList");
		var option = document.createElement("option");
		option.text = npcPos + " - " + npcs[npcPos].name;
		npcList.add(option);
	};
}