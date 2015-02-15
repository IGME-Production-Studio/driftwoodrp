var name, challenge, type, size, alignment, movement;

window.onload = function(){
	name = "undefined";
	challenge = "undefined";
	type = "undefined";
	size = "Tiny";
	alignment = "Unaligned";
	movement = "Burrow";
	
	console.log("Name: " + name + "\nChallenge Rating: " + challenge + "\nType: " + type + "\nSize Rating: " + size + "\nAlignment: " + alignment + "\nMovement Type: " + movement);
	
	checkForChange();
	generate();
};

function checkForChange()
{
	document.getElementById("sizeStatInput").onchange = function()
	{
		size = document.getElementById("sizeStatInput").value;
		console.log("New Size is " + size);
	};
	
	
	document.getElementById("alignmentStatInput").onchange = function()
	{
		alignment = document.getElementById("alignmentStatInput").value;
		console.log("New Alignment is " + alignment);
	};
	
	document.getElementById("movementStatInput").onchange = function()
	{
		movement = document.getElementById("movementStatInput").value;
		console.log("New Movement is " + movement);
	};
}

function generate()
{
	document.getElementById("generateButton").onclick = function()
	{
		console.log("Name: " + name + "\nChallenge Rating: " + challenge + "\nType: " + type + "\nSize Rating: " + size + "\nAlignment: " + alignment + "\nMovement Type: " + movement);
	};
}