// Character info - class to keep track of all current variables. 

var character = {};
// The character currently being created. 
function initCharacter() 
{
	character.charName = ""; 
	character.alignment = alignment.NeutralNeutral;
	character.level = 1;

	character.armorClass = 10; // starts at 10 always

	character.hitPoints = 0; // depends on class and level
	character.abilityScores = 
	{
		"Strength": 0, 
		"Dexterity": 0, 
		"Constitution": 0, 
		"Intelligence": 0, 
		"Wisdom": 0, 
		"Charisma": 0
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
/*
character.setRace = function(raceName, raceDesc, bonuses)
{
	character.race = { "name": raceName, "description": raceDesc, "bonuses": raceBonus.Dwarf };// Example for now
}*/
