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
	$('#newmonster').click(function()
	{
		
	});
	doLoadMonster(bestiary[0]);
}

function doSaveMonster()
{
	console.log("saving monster");
}

// load a monster object into the monster generator for editing
function doLoadMonster(monsterobj)
{
	console.log(monsterobj.name);
	// Load values into inputs
	$('#m_name').val(monsterobj.name);
	$('#m_class1').val(monsterobj.classes.class1.name); 
	$('#m_class2').val(monsterobj.classes.class2.name);
};

function doExitMgen()
{
 // for now, just close the window
 $('#monsteredit').slideUp();
}

function doNewMgen()
{
	$('#monsteredit').slideDown(); 
}