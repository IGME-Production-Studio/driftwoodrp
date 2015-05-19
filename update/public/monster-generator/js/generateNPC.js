//*************************************************************
//
// Filename: generateNPC.js
//	
// Authors:
//  Mario Chuman		mxc7819@g.rit.edu
//
//*************************************************************

//globals
var name, challenge, type, size, alignment, movement;

//*************************************************************
//  Function:
//      Onload Anyonymous Function
//
//  Parameters:
//      None
//
//  Return:
//      None
//
//  Description:
//      Establishes default values for an NPC and tracks changes 
//*************************************************************
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

//*************************************************************
//  Function:
//      checkForChange
//
//  Parameters:
//      None
//
//  Return:
//      None
//
//  Description:
//      When a value on the page changes, the appropriate value is updated
//*************************************************************
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

//*************************************************************
//  Function:
//      generate
//
//  Parameters:
//      None
//
//  Return:
//      None
//
//  Description:
//      When called, the values are established and console logged
//*************************************************************
function generate()
{
  document.getElementById("generateButton").onclick = function()
  {
    console.log("Name: " + name + "\nChallenge Rating: " + challenge + "\nType: " + type + "\nSize Rating: " + size + "\nAlignment: " + alignment + "\nMovement Type: " + movement);
  };
}