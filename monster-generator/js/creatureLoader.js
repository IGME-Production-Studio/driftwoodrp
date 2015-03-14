function loadCreature()
{
	loadBasics(sampleCreature);
}

// Load basic info
function loadBasics(creature)
{
	// This will eventually be a Node function to get things by name
	// for the purpose of demonstration I will briefly just grab a sample
	var overviewHTML = "<h1 class='heading'>Name: </h1><span>" + creature.name + "</span>";

	// Alignment
	overviewHTML += "<br><h1 class='heading'>Alignment: </h1><span>";
	overviewHTML += getAlignment(creature.alignment) + "</span>";
	overviewHTML += "<br><h1 class='heading'>Classes: </h1><span>" + getClass(creature.classes) + "</span>";

	$('#tabs-1').find('.tabContent').html(overviewHTML);
}

// take class info garbage and return as formatted
function getClass(classes)
{
	var returnable = "";
	if(classes.class1.name.length == 0)
		returnable += "[N/A],"; 
	else returnable += "[" + classes.class1.name +" level " + classes.class1.levels +"],";
	if(classes.class2.name.length ==0)
		returnable += " [N/A]";
	else returnable += "[" + classes.class2.name + " level " + classes.class2.levels +"]";

	return returnable;
}
function getAlignment(str)
{
	console.log('getting alignment for ' + str);
	switch(str)
	{
		case "N": return "Neutral"; break; 
		case "LE": return "Lawful Evil"; break;
		case "NE": return "Neutral Evil"; break; 
		case "CE": return "Chaotic Evil"; break;
		case "NG": return "Neutral Good"; break;
		case "CG": return "Chaotic Good"; break;
	}
	return "N/A";
}
// Load Notes

// Load combat

// Load feats/skills 
/*
// Albino Cave Spider
var sampleCreature = 
{
	"name": "Albino Cave Spider",
	"alignment": "N",
	"drops": { "xp": 200, "treasure": "Standard", "gear": "" },
	"classes": { "class1": {"name": "", "levels": 0 }, "class2": {"name": "", "levels": 0} },
	"classifications": {"type": "Vermin", "subtype": [], "group": "Spider"},
	"features": {"languages": [], "sq": "", "environment": "Underground", "organization": "Solitary or nest (2-20)"},
	"isCharacter": false, 
	"isCompanion": false,
	"savingThrows": {"fort": 0, "ref": 0, "wil": 0 }, 
	"combatInfo": {"cr": 0, "melee": "", "ranged": "" , "ac": 0, "ac_touch": 0, "ac_flatFooted": 0 },
	"spatial": {"size": "", "space": 0, "reach": 0}, 
	"abilityScores": {"str": 0, "dex": 0, "con": 0, "int": 0, "wis": 0, "cha": 0},
	"hitPoints": {"hitDie": "", "hp": 0}, 
	"feats": [], 
	"skills": [],
	"speed": { "speed": "", "baseSpeed": 0, "flySpeed": "", "maneuverability": "", "climbSpeed": 0, "swimSpeed": 0, "burrowSpeed": 0, "speedSpecial": "", "speedLand": 0, "fly": 0, "climb": 0, "burrow": 0, "swim": 0}
};*/