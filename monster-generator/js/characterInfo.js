// Character info - class to keep track of all current variables. 

// The character currently being created. 
var character = 
{
	this.name = ""; 
	this.alignment = undefined; 
}; 

character.setRace = function(raceName, raceDesc, bonuses)
{
	character.race = { "name": raceName, "description": raceDesc, "bonuses": raceBonus.Dwarf };// Example for now
}

character.