'use strict'; 
console.log('script loaded');
window.onload = init;

function init()
{
	console.log('page loaded');
	$('#mgentabs').tabs();


	// Set up events
	$('#saveicon').click(function()
	{
		doSaveMonster(); 
	});

	$('#xicon').click(function()
	{
		doExitMgen();
	});
}

function doSaveMonster()
{
	console.log("saving monster");
}

// load a monster object into the monster generator for editing
function loadMonster(monsterobj)
{

};
1
function doExitMgen()
{
 // for now, just close the window
 $('#monsteredit').slideUp();
}