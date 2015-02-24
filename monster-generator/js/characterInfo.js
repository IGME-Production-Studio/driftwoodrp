// Character info - class to keep track of all current variables. 

var character = {};
// The character currently being created. 
function initCharacter() 
{
	character.charName = ""; 
	character.alignment = alignment.NeutralNeutral;
	character.level = 1;
	character.characterType = characterType.Character;

	character.armorClass = 10; // starts at 10 always

	character.hitPoints = 0; // depends on class and level

	character.abilityPointsRemaining = 15; // hard-coded for now. 
	character.maxAbilityPoints = 15;

	character.abilityScores = 
	{
		"Strength": 10, 
		"Dexterity": 10, 
		"Constitution": 10, 
		"Intelligence": 10, 
		"Wisdom": 10, 
		"Charisma": 10
	}; 

	character.saves = 
	{
		"Fortitude": 0, 
		"Reflex": 0, 
		"Will": 0
	}

	character.skills = 
	[
	]; // empty for now, but initialized at least


	character.cclass = classes.Cleric; 

	character.raceBonus = raceBonus.Elf;
}; 


window.onload = function()
{

	console.log("Ready"); 
	initCharacter();
	console.log(character);

	var cw = $('#abilityScoreGraph').width(); 
	$('#abilityScoreGraph').css({'height':cw+'px'});
	$('#tabs').tabs();

	initGraphs();
	initAbilityScoreBtns();
};

/*
character.setRace = function(raceName, raceDesc, bonuses)
{
	character.race = { "name": raceName, "description": raceDesc, "bonuses": raceBonus.Dwarf };// Example for now
}*/
