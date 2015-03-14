var creatureTemplate = 
{
	"name": "",
	"alignment": "",
	"drops": { "xp": 0, "treasure": "", "gear": "" },
	"classes": { "class1": {"name": "", "levels": 0 }, "class2": {"name": "", "levels": 0} },
	"classifications": {"type": "", "subtype": [], "group": ""},
	"features": {"languages": [], "sq": "", "environment": "", "organization": ""},
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
};

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
	"spatial": {"size": "Gargantuan", "space": 0, "reach": 0}, 
	"abilityScores": {"str": 0, "dex": 0, "con": 0, "int": 0, "wis": 0, "cha": 0},
	"hitPoints": {"hitDie": "", "hp": 0}, 
	"feats": [], 
	"skills": [],
	"speed": { "speed": "", "baseSpeed": 0, "flySpeed": "", "maneuverability": "", "climbSpeed": 0, "swimSpeed": 0, "burrowSpeed": 0, "speedSpecial": "", "speedLand": 0, "fly": 0, "climb": 0, "burrow": 0, "swim": 0}
};

// only flight has maneuverability
// When you choose flight you get maneuverability
// ground speed should default to 30
// t 15
// s 20
// m 30 
// for default speeds